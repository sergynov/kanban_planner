import { request } from "../components/utils/server-request";
import { ACTION_TYPE } from "./action-types";
import { URL } from "../constants/url";

export const userLogout = () => async (dispatch) => {

  await request(`${URL}/auth/logout`, 'POST'); 
    dispatch({ type: ACTION_TYPE.LOGOUT });
};

