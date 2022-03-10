export class Class {
  id: string;
  name: string;
  constructor(classOptions: ClassOptions) {
    this.id = classOptions.id;
    this.name = classOptions.name;
  }
  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

export interface ClassOptions {
  id: string;
  name: string;
}
