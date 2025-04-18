import { isEmail } from "class-validator";

export class Email {
    constructor(private readonly value: string) {
      if (!this.isValidEmail(value)) {
        throw new Error('Invalid email format');
      }
    }
  
    private isValidEmail(email: string): boolean {
      return isEmail(email)
    }
  
    getValue(): string {
      return this.value;
    }
  }