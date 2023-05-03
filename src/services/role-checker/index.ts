import {ISso} from "@common/interfaces/sso";

export namespace RoleChecker {
  export const checkRole = (user: ISso.CurrentUserModel, roles: ISso.UserRole[]): boolean => {
    return roles.includes(user.role);
  }
}