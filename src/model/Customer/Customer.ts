export class Customer {
  constructor(
    private id: bigint | undefined,
    private name: string,
    private grade: CustomerGrade,
  ) {}

  getId(): bigint | undefined {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getGrade(): CustomerGrade {
    return this.grade;
  }
}

export class CustomerGrade {
  constructor(
    private id: number | undefined,
    private grade: string,
  ) {}
  getGrade(): string {
    return this.grade;
  }
}
