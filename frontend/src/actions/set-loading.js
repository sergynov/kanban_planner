import { ACTION_TYPE } from "./action-types";

export const setLoading = (isLoading) => ({
  type: ACTION_TYPE.SET_LOADING,
  payload: isLoading
});