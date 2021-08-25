import { ActionType } from "../action-types/index"

interface UserIDAction {
    type: ActionType.USERID,
    payload: number
}

interface RoomIDAction {
  type: ActionType.ROOMID,
  payload: string
}




export type Action = UserIDAction | RoomIDAction;
