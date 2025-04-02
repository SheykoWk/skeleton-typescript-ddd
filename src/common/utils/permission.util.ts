import { Permission } from "users/domain/enums/permissions.enum";
import { Role } from "users/domain/enums/role.enum";

export const RoleMapperPermissions = {
	[Role.ADMIN]: Object.values(Permission),
	[Role.OPERATOR]: [],
	[Role.USER]: []
}