export enum AuthenticationRoutes {
	LOGIN = '/auth/login',
	LOGOUT = '/auth/logout',
	REFRESH_TOKEN = '/auth/refresh-token',
	REGISTER = '/auth/register',
	MFA_SETUP = '/auth/2fa/setup',
	MFA_VERIFY = '/auth/2fa/verify',
	FORGOT_PASSWORD = '/auth/forgot-password',
	RESET_PASSWORD = '/auth/reset-password',
	VERIFY_EMAIL = '/auth/verify-email',
	RESEND_VERIFICATION_EMAIL = '/auth/resend-verification-email',
	CHANGE_PASSWORD = '/auth/change-password',
	UPDATE_PROFILE = '/auth/update-profile',
	DELETE_ACCOUNT = '/auth/delete-account',
}
