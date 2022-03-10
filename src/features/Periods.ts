export type Periods = Period[];

export class Period {
  id: string;
  name: string;
  start: Date;
  end: Date;
  isFullYear: boolean;
  constructor(periodOptions: PeriodOptions) {
    this.id = periodOptions.id;
    this.name = periodOptions.name;
    this.start = periodOptions.start;
    this.end = periodOptions.end;
    this.isFullYear = periodOptions.isFullYear;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      start: this.start,
      end: this.end,
      isFullYear: this.isFullYear,
    };
  }
}

export interface PeriodOptions {
  id: string;
  name: string;
  start: Date;
  end: Date;
  isFullYear: boolean;
}
