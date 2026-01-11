import { request } from "../components/utils/server-request"
import { setUser } from "./set-user"
import { URL } from "../constants/url"



export const userLogin = (login,password) => async (dispatch) => {
  try {
    const data = await request(`${URL}/auth/login`, 'POST', {login,password})
    if(!data.error) {
      dispatch(setUser({ id: data.user.id, login: data.user.login }));
    }
    return data;

  } catch (error) {
    throw new Error (error)
  }

  }