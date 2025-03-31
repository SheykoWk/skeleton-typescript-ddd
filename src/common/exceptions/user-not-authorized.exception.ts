export class UserNotAuthorizedException extends Error {
	constructor(message = 'User not authorized') {
	  super(message);
	  this.name = 'UserNotAuthorizedException';
	}
  }