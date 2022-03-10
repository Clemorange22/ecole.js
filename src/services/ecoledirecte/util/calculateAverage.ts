import { gradeOptions, SubjectsAverages } from "../../../features/";
import { round, isString, toNumber } from "lodash";
import { Subject as _Subject } from "ecoledirecte.js";
import { Period as _Period } from "ecoledirecte.js";

export function calculateSubjectAverage(
  grades: gradeOptions[],
  periodName?: string
): number {
  let valuesSum = 0;
  let coefficientsSum = 0;
  for (const grade of grades) {
    if (!grade.value || (periodName && grade.periodName !== periodName)) {
      continue;
    }
    valuesSum +=
      ((grade.coefficient ? grade.value * grade.coefficient : grade.value) /
        grade.outOf) *
      20;

    coefficientsSum += grade.coefficient || 1;
  }

  return round(valuesSum / coefficientsSum, 2);
}

export function calculateSubjectsAverages(
  _subjects: _Subject[],
  grades: gradeOptions[]
): SubjectsAverages {
  return Array.from(_subjects, (_subject) => {
    const subjectAverage = calculateSubjectAverage(
      grades.filter((grade) => grade.subject === _subject.name)
    );
    return {
      subjectName: _subject.name,
      subjectCoefficient: _subject.weight,

      studentAverage: isNaN(subjectAverage)
        ? toNumber(
            _subjects.find((subject) => subject.name === _subject.name)?._raw
              .moyenne
          )
        : subjectAverage,

      classAverage: _subject.class.avg,
      classMin: _subject.class.min,
      classMax: _subject.class.max,
    };
  });
}

export function calculateOverallAverage(
  subjectsAverages: SubjectsAverages
): number | undefined {
  let valuesSum = 0;
  let coefficientsSum = 0;
  let atLeastOneSubjectHasAverage = false;
  for (const subjectAverage of subjectsAverages) {
    if (!subjectAverage.studentAverage) continue;
    atLeastOneSubjectHasAverage = true;
    valuesSum +=
      subjectAverage.studentAverage * subjectAverage.subjectCoefficient;
    coefficientsSum += subjectAverage.subjectCoefficient;
  }
  return atLeastOneSubjectHasAverage
    ? round(valuesSum / coefficientsSum, 2)
    : undefined;
}
