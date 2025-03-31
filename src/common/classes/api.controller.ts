import { Controller } from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiExceptionsHttpStatusCodeMapping } from './api.exceptions';

@Controller()
export abstract class ApiController {
  constructor(
    protected readonly queryBus: QueryBus,
    protected readonly commandBus: CommandBus,
    protected readonly exceptionMapping: ApiExceptionsHttpStatusCodeMapping,
  ) {}

  protected async executeQuery<T>(query: T): Promise<any> {
    try {
      return await this.queryBus.execute(query);
    } catch (error) {
      throw this.exceptionMapping.map(error);
    }
  }

  protected async executeCommand<T>(command: T): Promise<any> {
    try {
      return await this.commandBus.execute(command);
    } catch (error) {
      throw this.exceptionMapping.map(error);
    }
  }
}