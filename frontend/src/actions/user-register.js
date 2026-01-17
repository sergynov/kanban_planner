import { request } from "../components/utils/server-request"
import { setUser } from "./set-user"
import { URL } from "../constants/url"


export const userRegister = (login,password) => async (dispatch) => {
  try {
    const data = await request(`${URL}/auth/register`, 'POST', {login,password})
    if(data.user) {
      dispatch(setUser({ id: data.user.id, login: data.user.email }));
    }
    return data;
  } catch (e) {
    throw new Error (e)
  }

  }