import { URL } from "../constants/url";
import { setBoards } from "./set-boards";
import { request } from "../components/utils/server-request";
import { setLoading } from "./set-loading";

export const fetchAllBoards = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const res = await request(`${URL}/boards`, 'GET');
    dispatch(setBoards(res.data.boards)); // кладём массив досок в редюсер
  } catch (e) {
    console.error("Failed to fetch boards:", e);
  } finally {
    dispatch(setLoading(false));
  }
};