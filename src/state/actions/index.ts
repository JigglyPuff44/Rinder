import { ActionType } from "../action-types/index"

interface UserIDAction {
    type: ActionType.USERID,
    payload: number
}

interface RoomIDAction {
  type: ActionType.ROOMID,
  payload: string
}

interface UserListAction {
  type: ActionType.USERLIST,
  payload: []
}

interface RestListAction {
  type: ActionType.RESTLIST,
  payload: []
}



export type Action = UserIDAction | RoomIDAction | UserListAction | RestListAction;
