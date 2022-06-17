import TurndownService from "turndown";
import {
  Period as _Period,
  Student as _Student,
  Course as _Course,
  Assignement as _Homework,
} from "ecoledirecte.js";
import { isString } from "lodash";

import { BaseEcoledirecteAccount } from "..";
import { Session } from "../../..";
import {
  StudentInfo,
  StudentInfoOptions,
  verifyFeature,
  Periods,
  Period,
  Class,
  Homework,
} from "../../../features";
import {
  Grades,
  gradeOptions,
  FullYearAverages,
} from "../../../features/Grades";
import { Timetable, TimetableOptions } from "../../../features/Timetable";
import {
  getCurrentPeriod,
  calculateSubjectsAverages,
  calculateOverallAverage,
} from "../util";

import { formatID } from "../../../util";

export class EcoledirecteStudent extends BaseEcoledirecteAccount {
  declare _account: _Student;
  constructor(student: _Student, session: Session) {
    super(student, session);

    // Detection of enabled features on the student account

    // StudentInfo is always enabled
    this.features.push("STUDENT_INFO");

    // Class
    if (this._account._raw.profile && this._account._raw.profile.classe) {
      this.features.push("CLASS");
    }

    // Grades
    if (this._account.hasModule("NOTES")) {
      this.features.push("GRADES");
      this.features.push("PERIODS");
    }

    // Timetable
    if (this._account.hasModule("EDT")) {
      this.features.push("TIMETABLE");
    }

    // Homework
    if (this._account.hasModule("CAHIER_DE_TEXTES")) {
      this.features.push("HOMEWORK");
    }
  }
  async getStudentInfo(): Promise<StudentInfo> {
    verifyFeature(this.features, "STUDENT_INFO");
    const studentInfoOptions: StudentInfoOptions = {
      id: formatID("ecoledirecte", this._account.edId.toString()),

      fullName: this._account._raw.prenom + " " + this._account._raw.nom,
      firstName: this._account._raw.prenom,
      lastName: this._account._raw.nom,

      class: this.hasFeature("CLASS") ? await this.getClass() : undefined,

      email:
        this._account._raw.email != "" ? this._account._raw.email : undefined,
      establishmentfullName: this._account._raw.nomEtablissement,
    };
    return new StudentInfo(studentInfoOptions);
  }

  async getGrades(): Promise<Grades> {
    verifyFeature(this.features, "GRADES");
    const _gradesAndPeriods = await this._account.getGradesAndPeriods();
    const _grades = _gradesAndPeriods.grades;
    const _periods = _gradesAndPeriods.periods;
    const _currentPeriod = getCurrentPeriod(_periods);
    const _fullYearPeriod = _periods.find((_period: _Period) => _period.yearly);
    const grades: gradeOptions[] = [];
    for (const _grade of _grades) {
      grades.push({
        name: _grade.name,
        subject: _grade.subjectName,

        value: isString(_grade.value) ? undefined : _grade.value,
        outOf: _grade.outOf,
        coefficient: _grade.unweighted ? 0 : _grade.weight,

        classAverage: isString(_grade.classAvg) ? undefined : _grade.classAvg,
        classMin: isString(_grade.classMin) ? undefined : _grade.classMin,
        classMax: isString(_grade.classMax) ? undefined : _grade.classMax,

        date: _grade.date,
        periodName: _periods.find(
          (_period: _Period) => _period.code === _grade.periodCode
        )?.name,

        isAbsent: _grade.value == "Abs " ? true : false,
      });
    }
    const fullYearSubjectsAverages = calculateSubjectsAverages(
      _fullYearPeriod?.subjects ? _fullYearPeriod.subjects : [],
      grades
    );
    const fullYearAverages: FullYearAverages = {
      overall: {
        studentAverage: calculateOverallAverage(fullYearSubjectsAverages),

        classAverage: _fullYearPeriod?.class.averageGrade,

        classMin: _fullYearPeriod?._raw.ensembleMatieres.moyenneMin
          ? parseFloat(
              _fullYearPeriod._raw.ensembleMatieres.moyenneMin?.replace(
                /,/,
                "."
              )
            )
          : undefined,
        classMax: _fullYearPeriod?._raw.ensembleMatieres.moyenneMax
          ? parseFloat(
              _fullYearPeriod._raw.ensembleMatieres.moyenneMax?.replace(
                /,/,
                "."
              )
            )
          : undefined,
      },
      subjects: fullYearSubjectsAverages,
    };
    const periodAverages = [];
    for (const _period of _periods) {
      if (_period.yearly) continue;
      const periodGrades = grades.filter(
        (grade: gradeOptions) => grade.periodName === _period.name
      );
      const periodSubjectsAverages = calculateSubjectsAverages(
        _period.subjects ? _period.subjects : [],
        periodGrades
      );
      periodAverages.push({
        periodName: _period.name,
        overall: {
          studentAverage: calculateOverallAverage(periodSubjectsAverages),
          classAverage: _period.class.averageGrade,
          classMin: _period._raw.ensembleMatieres.moyenneMin
            ? parseFloat(
                _period._raw.ensembleMatieres.moyenneMin.replace(/,/, ".")
              )
            : undefined,
          classMax: _period._raw.ensembleMatieres.moyenneMax
            ? parseFloat(
                _period._raw.ensembleMatieres.moyenneMax.replace(/,/, ".")
              )
            : undefined,
        },
        subjects: periodSubjectsAverages,
      });
    }
    const averages = {
      fullYear: fullYearAverages,
      periods: periodAverages,
      activePeriod: _currentPeriod ? _currentPeriod.name : undefined,
    };
    return new Grades(grades, averages);
  }

  async getTimetable({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }): Promise<Timetable> {
    verifyFeature(this.features, "TIMETABLE");
    const _timetable: _Course[] = await this._account.getTimetable([
      startDate,
      endDate,
    ]);
    const timetable: TimetableOptions = {
      courses: Array.from(_timetable, (_course: _Course) => {
        return {
          id: formatID("ecoledirecte", _course.id.toString()),

          subject: _course.subject,
          teacher: _course.teacher,
          room: _course.room,
          class: _course.class,

          startDate: _course.startDate,
          endDate: _course.endDate,

          isCancelled: _course.isCancelled,
          isModified: _course.isModified,
          isStudentExempted: _course.isExempted ? true : false,

          color: _course.color,
        };
      }),
      startDate: startDate,
      endDate: endDate,
    };
    return new Timetable(timetable);
  }

  async getPeriods(): Promise<Periods> {
    verifyFeature(this.features, "PERIODS");
    return Array.from(await this._account.getPeriods(), (_period: _Period) => {
      return new Period({
        id: formatID("ecoledirecte", _period.code),
        name: _period.name,

        start: _period.start,
        end: _period.end,
        isFullYear: _period.yearly,
      });
    });
  }

  async getClass(): Promise<Class> {
    verifyFeature(this.features, "CLASS");
    if (!this._account._raw.profile.classe) throw new Error("No class found");
    return new Class({
      id: formatID("ecoledirecte", this._account._raw.profile.classe.code),
      name: this._account._raw.profile.classe.libelle,
    });
  }

  async getHomework(dates?: { start: Date; end: Date }): Promise<Homework[]> {
    verifyFeature(this.features, "HOMEWORK");
    const turndownService = new TurndownService();
    const _homework = await this._account.getHomework({
      dates: dates ? [dates.start, dates.end] : undefined,
      onlyWithWork: true,
    });
    return Array.from(_homework, (_homework: _Homework) => {
      if (!_homework.job) throw new Error("No job found");

      return new Homework({
        id: formatID("ecoledirecte", _homework.id.toString()),
        subjectID: formatID("ecoledirecte", _homework.subject.code.toString()),
        description: turndownService.turndown(_homework.job?.content.html),
        teacher: _homework.teacher,

        givenAtDate: _homework.job.givenAt,
        dueDate: _homework.date,

        isDone: _homework.job.done,
        isTest: _homework.test,
        toReturnOnline: _homework.job.toReturnOnline,
      });
    });
  }
}
