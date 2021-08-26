import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions/index';

export const newUserID = (user_id: number) => {
  console.log('hello from newUserID action', user_id);
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.USERID,
      payload: user_id,
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

export const newUserList = (userList: Array<string>) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.USERLIST,
      payload: userList,
    });
  };
};

export const newRestList = (restList: Array<object>) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RESTLIST,
      payload: restList,
    });
  };
};

export const newRestResult = (restResult: object) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.RESTRESULT,
      payload: restResult,
    });
  };
};

export const newName = (name: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.NAME,
      payload: name,
    });
  };
};
