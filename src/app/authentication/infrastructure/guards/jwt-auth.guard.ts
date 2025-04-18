import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
	constructor(private reflector: Reflector) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
		if (isPublic) {
			return true;
		}
		const req = context.switchToHttp().getRequest();

		const result = super.canActivate(context) as
			| boolean
			| Promise<boolean>
			| Observable<boolean>;

		if (!req.user) {
			const user = context.switchToHttp().getRequest()?.authInfo;
			req.user = user;
		}

		return result instanceof Observable ? await lastValueFrom(result) : result;
	}
	handleRequest(err, user, info, context: ExecutionContext) {
		if (err || !user) {
		  throw err || new UnauthorizedException('Token inválido o usuario no encontrado');
		}
	
		const req = context.switchToHttp().getRequest();
		req.user = user;
	
		return user;
	  }
}
