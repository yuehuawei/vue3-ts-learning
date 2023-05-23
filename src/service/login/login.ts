import ackRequest from "../index";
import { IAccount, IDataType, ILoginResult } from "./type";
enum LoginApi {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/",
}
export function accountLoginRequest(account: IAccount) {
  return ackRequest.post<IDataType<ILoginResult>>({
    url: "/login",
    data: account,
  });
}

export function requestUserInfoById(id: number) {
  return ackRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
  });
}

export function requestUserMenuByRoleId(id: number) {
  return ackRequest.get<IDataType>({
    url: LoginApi.UserMenus + id + "/menu",
  });
}
