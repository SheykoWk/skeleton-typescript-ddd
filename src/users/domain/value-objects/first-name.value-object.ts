export class FirstName {
    constructor(private readonly value: string) {
      if (!value || value.length < 3) {
        throw new Error('Invalid First Name format');
      }
    }
  

  
    getValue(): string {
      return this.value;
    }
}