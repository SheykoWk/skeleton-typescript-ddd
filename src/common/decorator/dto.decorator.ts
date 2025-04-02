import { SetMetadata, UseInterceptors, applyDecorators } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ResponseDto } from 'common/dtos/core/dto.response';
import { Observable, map } from 'rxjs';

export function Dto<T extends ResponseDto<T>>(dto: new () => T) {
	return applyDecorators(SetMetadata('dto', dto), UseInterceptors(new DtoInterceptor(dto)));
}

export class DtoInterceptor<T extends ResponseDto<T>> implements NestInterceptor {
	constructor(private dto: new () => T) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(map((data) => new this.dto().build(data)));
	}
}
