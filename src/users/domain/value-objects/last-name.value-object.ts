export class LastName {
    constructor(private readonly value: string) {
      if (!value || value.length < 3) {
        throw new Error('Invalid Last Name format');
      }
    }
  
    getValue(): string {
      return this.value;
    }
}