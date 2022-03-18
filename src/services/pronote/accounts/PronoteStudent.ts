import TurndownService from "turndown";
import { PronoteBaseAccount } from "../PronoteAccount";
import {
  Mark as _Grade,
  Marks as _Grades,
  Lesson as _Course,
  PronoteStudentSession as _PronoteStudentSession,
} from "pronote-api";
import {
  Class,
  Course,
  FullYearAverages,
  Grade,
  Grades,
  Homework,
  Period,
  Periods,
  Session,
  StudentInfo,
  Timetable,
  verifyFeature,
} from "../../..";
import { calculateSubjectsAverages, findActivePeriod } from "../util";
import { formatID } from "../../../util";

export class PronoteStudent extends PronoteBaseAccount {
  declare _account: _PronoteStudentSession;
  constructor(account: _PronoteStudentSession, session: Session) {
    super(account, session);
    (async () => {
      // Detection of enabled features on the student account

      // StudentInfo est toujours activé
      this.features.push("STUDENT_INFO");
      this.features.push("CLASS");

      // Grades
      if ((await this._account.marks()) && this._account.params?.periods) {
        this.features.push("GRADES");
        this.features.push("PERIODS");
      }

      // Timetable
      if (await this._account.timetable()) {
        this.features.push("TIMETABLE");
      }

      // Homework
      if (await this._account.homeworks()) {
        this.features.push("HOMEWORK");
      }
    })();
  }

  async getStudentInfo(): Promise<StudentInfo> {
    verifyFeature(this.features, "STUDENT_INFO");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Forcément défini car la session a été créé à partir de la fonction login de pronote-api
    const _user = this._account.user!;
    return new StudentInfo({
      id: formatID("pronote", _user.id),
      fullName: _user.name,
      class: await this.getClass(),
      establishmentfullName: _user.establishment.name,
    });
  }

  async getGrades(): Promise<Grades> {
    verifyFeature(this.features, "GRADES");

    //Récupération des notes et des périodes depuis pronote
    const _periods = await this._account.params?.periods;
    if (!_periods) throw new Error("No periods found");
    const _fullYearPeriod = _periods.find((_period) => _period.type == "year");
    if (!_fullYearPeriod) throw new Error("No full year period");
    const _fullYearGrades = await this._account.marks(_fullYearPeriod);
    if (!_fullYearGrades) throw new Error("Grades are not enabled");
    if (!_fullYearGrades?.subjects) throw new Error("No subjects");
    const _periodsExceptedFullYear = _periods.filter(
      (_period) => !(_period.type == "year")
    );
    const _periodsMarksExceptedFullYear = new Map<string, _Grades>();
    _periodsExceptedFullYear.forEach(async (_period) => {
      const _periodGrades = await this._account.marks(_period);
      if (!_periodGrades) throw new Error("Grades are not enabled");
      _periodsMarksExceptedFullYear.set(_period.id, _periodGrades);
    });

    //Transformation des données
    const fullYearSubjectsAverages = calculateSubjectsAverages(
      _fullYearGrades.subjects
    );
    const fullYearAverages = new FullYearAverages({
      overall: {
        studentAverage: _fullYearGrades?.averages.student,
        classAverage: _fullYearGrades?.averages.studentClass,
      },
      subjects: fullYearSubjectsAverages,
    });
    const periodAverages = await Array.from(
      _periodsExceptedFullYear,
      (_period) => {
        const _periodGrades = _periodsMarksExceptedFullYear.get(_period.id);
        if (!_periodGrades?.subjects) throw new Error("No subjects");
        return {
          periodName: _period.name,
          overall: {
            studentAverage: _periodGrades?.averages.student,
            classAverage: _periodGrades?.averages.studentClass,
          },
          subjects: calculateSubjectsAverages(_periodGrades?.subjects),
        };
      }
    );
    const averages = {
      fullYear: fullYearAverages,
      periods: periodAverages,
      activePeriod: findActivePeriod(_periods),
    };
    const fullYearGrades: Grade[] = Array.from(
      _periodsExceptedFullYear,
      (_period) => {
        const _periodGrades = _periodsMarksExceptedFullYear.get(_period.id);
        if (!_periodGrades?.subjects) return [];
        return Array.from(_periodGrades.subjects, (_subject) => {
          return Array.from(_subject.marks, (_grade: _Grade) => {
            return new Grade({
              id: formatID("pronote", _grade.id),

              name: _grade.title,
              subject: _subject.name,

              value: _grade.value,
              outOf: _grade.scale,
              coefficient: _grade.coefficient,

              date: _grade.date,
              periodName: _period.name,

              isAbsent: _grade.isAway,
              classAverage: _grade.average,
              classMax: _grade.max,
              classMin: _grade.min,
            });
          });
        });
      }
    ).flat(2);
    return new Grades(fullYearGrades, averages);
  }

  async getTimetable({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }): Promise<Timetable> {
    verifyFeature(this.features, "TIMETABLE");

    const _timetable = await this._account.timetable(startDate, endDate);
    if (_timetable == null) throw new Error("Timetable is not enabled");
    return new Timetable({
      startDate,
      endDate,
      courses: Array.from(_timetable, (_course: _Course) => {
        return new Course({
          id: formatID("pronote", _course.id),

          subject: _course.subject,
          teacher: _course.teacher,
          room: _course.room,

          startDate: _course.from,
          endDate: _course.to,

          isTeacherAbsent: _course.isAway,
          isCancelled: _course.isCancelled,

          isDetention: _course.isDetention,
          isRemote: _course.remoteLesson,

          color: _course.color,
        });
      }),
    });
  }

  async getClass(): Promise<Class> {
    verifyFeature(this.features, "CLASS");
    if (!this._account.user) throw new Error("No class found");
    return new Class({
      id: formatID("pronote", this._account.user.studentClass.id),
      name: this._account.user.studentClass.name,
    });
  }

  async getPeriods(): Promise<Periods> {
    verifyFeature(this.features, "PERIODS");
    if (!this._account.params?.periods) throw new Error("No periods found");
    return Array.from(this._account.params.periods, (_period) => {
      return new Period({
        id: formatID("pronote", _period.id),
        name: _period.name,

        isFullYear: _period.type == "year",
        start: _period.from,
        end: _period.to,
      });
    });
  }

  async getHomework(dates?: { start: Date; end: Date }): Promise<Homework[]> {
    verifyFeature(this.features, "HOMEWORK");
    const turndownService = new TurndownService();
    const _homework = await this._account.homeworks(
      dates ? dates.start : undefined,
      dates
        ? dates.end
        : (await this.getPeriods()).find((_period) => _period.isFullYear)?.end
    );
    if (!_homework && _homework !== [])
      throw new Error("Homework is not enabled");
    return Array.from(_homework, (_homework) => {
      return new Homework({
        id: formatID("pronote", _homework.id),
        description: turndownService.turndown(_homework.htmlDescription),
        givenAtDate: _homework.givenAt,
        dueDate: _homework.for,
        isDone: _homework.done,
        color: _homework.color,
      });
    });
  }
}
