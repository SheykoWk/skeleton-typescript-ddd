import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Welcome to Sh3yk0's API";
  }
}
