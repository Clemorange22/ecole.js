export class Grades {
  list: Grade[];
  averages: Averages;

  constructor(grades: gradeOptions[], averages: AveragesOptions) {
    this.list = grades.map((grade) => new Grade(grade));
    this.averages = new Averages(averages);
  }
}

export class Grade {
  id?: string;
  name: string;
  subject: string;

  value?: number;
  outOf: number;
  coefficient?: number;

  classAverage?: number;
  classMax?: number;
  classMin?: number;

  date?: Date;
  periodName?: string;

  isAbsent: boolean;

  constructor(gradeOptions: gradeOptions) {
    this.id = gradeOptions.id;
    this.name = gradeOptions.name;
    this.subject = gradeOptions.subject;
    this.value = gradeOptions.value;
    this.outOf = gradeOptions.outOf;
    this.coefficient = gradeOptions.coefficient;
    this.classAverage = gradeOptions.classAverage;
    this.classMax = gradeOptions.classMax;
    this.classMin = gradeOptions.classMin;
    this.date = gradeOptions.date;
    this.periodName = gradeOptions.periodName;
    this.isAbsent = gradeOptions.isAbsent;
  }

  toJSON(): gradeOptions {
    return {
      id: this.id,
      name: this.name,
      subject: this.subject,
      value: this.value,
      outOf: this.outOf,
      coefficient: this.coefficient,
      classAverage: this.classAverage,
      classMax: this.classMax,
      classMin: this.classMin,
      date: this.date,
      periodName: this.periodName,
      isAbsent: this.isAbsent,
    };
  }
}

export interface gradeOptions {
  id?: string;
  name: string;
  subject: string;
  value?: number;
  outOf: number;
  coefficient?: number;
  classAverage?: number;
  classMax?: number;
  classMin?: number;
  date?: Date;
  periodName?: string;
  isAbsent: boolean;
}

export class Averages {
  fullYear: FullYearAverages;
  periods: PeriodAverages[];
  constructor(averagesOptions: AveragesOptions) {
    this.fullYear = averagesOptions.fullYear;
    this.periods = averagesOptions.periods;
  }
}

export interface AveragesOptions {
  fullYear: FullYearAverages;
  periods: PeriodAverages[];
  activePeriod?: string;
}

export class FullYearAverages {
  overall: OverallAverages;

  subjects: SubjectsAverages;

  constructor(periodAveragesOptions: FullYearAveragesOptions) {
    this.overall = periodAveragesOptions.overall;
    this.subjects = periodAveragesOptions.subjects;
  }
}

export interface FullYearAveragesOptions {
  overall: OverallAverages;
  subjects: SubjectsAverages;
}

export class PeriodAverages {
  periodName: string;

  overall: OverallAverages;

  subjects: SubjectsAverages;

  constructor(periodAveragesOptions: PeriodAveragesOptions) {
    this.periodName = periodAveragesOptions.periodName;
    this.overall = periodAveragesOptions.overall;
    this.subjects = periodAveragesOptions.subjects;
  }
}

export interface PeriodAveragesOptions {
  periodName: string;
  overall: OverallAverages;
  subjects: SubjectsAverages;
}

export interface OverallAverages {
  studentAverage?: number;

  classAverage?: number;
  classMin?: number;
  classMax?: number;
}

export type SubjectsAverages = SubjectAverages[];

export interface SubjectAverages {
  subjectName: string;
  subjectCoefficient: number;

  studentAverage?: number;

  classAverage?: number;
  classMin?: number;
  classMax?: number;
}
