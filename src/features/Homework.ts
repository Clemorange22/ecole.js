export class Homework {
  id: string;
  courseID?: string;
  subjectID: string;
  /**
   * @description La decription du devoir à faire au format markdown
   */
  description?: string;
  teacher: string;

  givenAtDate?: Date;
  dueDate: Date;

  isDone: boolean;
  isTest: boolean;
  toReturnOnline: boolean;
  color?: string;

  constructor(homeworkOptions: HomeworkOptions) {
    this.id = homeworkOptions.id;
    this.courseID = homeworkOptions.courseID;
    this.subjectID = homeworkOptions.subjectID;
    this.description = homeworkOptions.description;
    this.teacher = homeworkOptions.teacher;
    this.givenAtDate = homeworkOptions.givenAtDate;
    this.dueDate = homeworkOptions.dueDate;
    this.isDone = homeworkOptions.isDone;
    this.isTest = homeworkOptions.isTest;
    this.toReturnOnline = homeworkOptions.toReturnOnline;
    this.color = homeworkOptions.color;
  }

  toJSON(): HomeworkOptions {
    return {
      id: this.id,
      courseID: this.courseID,
      subjectID: this.subjectID,
      description: this.description,
      teacher: this.teacher,
      givenAtDate: this.givenAtDate,
      dueDate: this.dueDate,
      isDone: this.isDone,
      isTest: this.isTest,
      toReturnOnline: this.toReturnOnline,
      color: this.color,
    };
  }
}

export interface HomeworkOptions {
  id: string;
  courseID?: string;
  subjectID: string;
  description?: string;
  teacher: string;
  givenAtDate?: Date;
  dueDate: Date;
  isDone: boolean;
  isTest: boolean;
  toReturnOnline: boolean;
  color?: string;
}
