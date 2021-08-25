import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions/index";

export const newUserID = (userID: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.USERID,
      payload: userID,
    });
  };
};

export const newRoomID = (roomID: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ROOMID,
      payload: roomID,
    });
  };
};

export const newUserList = (userList: []) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.USERLIST,
      payload: userList,
    });
  };
};

export const newRestList = (restList: []) => {
    return (dispatch: Dispatch<Action>) => {
      dispatch({
        type: ActionType.RESTLIST,
        payload: restList,
      });
    };
  };
  