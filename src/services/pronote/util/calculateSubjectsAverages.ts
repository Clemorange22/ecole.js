import { MarksSubject as _MarksSubject } from "pronote-api";

export function calculateSubjectsAverages(_subjects: _MarksSubject[]) {
  return Array.from(_subjects, (_subject: _MarksSubject) => {
    return {
      subjectName: _subject.name,
      subjectCoefficient: 1,

      studentAverage: _subject.averages.student,
      classAvergae: _subject.averages.studentClass,
      classMin: _subject.averages.min,
      classMax: _subject.averages.max,
    };
  });
}
