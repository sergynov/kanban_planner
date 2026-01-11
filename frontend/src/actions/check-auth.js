import { request } from "../components/utils/server-request";
import { setUser } from "./set-user";
import { userLogout } from "./user-logout";
import { URL } from "../constants/url";

export const checkAuth = () => async (dispatch) => {
  try {
    const data = await request(`${URL}/auth`);
    const user = data?.data?.user;
    dispatch(setUser({id: user.id, login: user.login}));
  } catch {
    dispatch(userLogout());
  }
};