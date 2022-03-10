export class Timetable {
  courses: Course[];
  length: number;

  startDate: Date;
  endDate: Date;

  constructor(timetableOptions: TimetableOptions) {
    this.courses = timetableOptions.courses;
    this.length = timetableOptions.courses.length;
    this.startDate = timetableOptions.startDate;
    this.endDate = timetableOptions.endDate;
  }
}

export interface TimetableOptions {
  courses: Course[];

  startDate: Date;
  endDate: Date;
}

export class Course {
  id: string;

  subject?: string; //If the course is a detention, there is no subject
  teacher?: string;
  room?: string;
  class?: string;

  startDate: Date;
  endDate: Date;

  isTeacherAbsent?: boolean;
  isCancelled?: boolean;
  isModified?: boolean;
  isStudentExempted?: boolean;

  isRemote?: boolean;
  isDetention?: boolean;

  color?: string;

  constructor(course: CourseOptions) {
    this.id = course.id;

    this.subject = course.subject;
    this.teacher = course.teacher;
    this.room = course.room;
    this.class = course.class;

    this.startDate = course.startDate;
    this.endDate = course.endDate;

    this.isTeacherAbsent = course.isTeacherAbsent;
    this.isCancelled = course.isCancelled;
    this.isModified = course.isModified;
    this.isStudentExempted = course.isStudentExempted;
    this.isRemote = course.isRemote;

    this.isDetention = course.isDetention;

    this.color = course.color;
  }
}

export interface CourseOptions {
  id: string;

  subject?: string;
  teacher?: string;
  room?: string;
  class?: string;

  startDate: Date;
  endDate: Date;

  isTeacherAbsent?: boolean;
  isCancelled?: boolean;
  isModified?: boolean;
  isStudentExempted?: boolean;
  isRemote?: boolean;

  isDetention?: boolean;

  color?: string;
}
