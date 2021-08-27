import { ActionType } from '../action-types/index';

interface UserIDAction {
  type: ActionType.USERID;
  payload: number;
}

interface RoomIDAction {
  type: ActionType.ROOMID;
  payload: string;
}

interface UserListAction {
  type: ActionType.USERLIST;
  payload: Array<string>;
}

interface RestListAction {
  type: ActionType.RESTLIST;
  payload: Array<object>;
}

interface RestResultAction {
  type: ActionType.RESTRESULT;
  payload: object;
}

interface NameAction {
  type: ActionType.NAME;
  payload: string;
}

export type Action = UserIDAction | RoomIDAction | UserListAction | RestListAction | NameAction | RestResultAction;
