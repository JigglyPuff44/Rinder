import { ActionType } from "../action-types/index";
import { Action } from "../actions";

export interface State {
  userID: number;
  isLoggedIn: boolean;
  roomID: string;
  userList: [];
  restList: [];
}

const initialState = {
  userID: 0,
  isLoggedIn: false,
  roomID: "",
  userList: [],
  restList: []
};

const reducer = (state: object = initialState, action: Action): object => {
  switch (action.type) {
    case ActionType.USERID:
      return {
        ...state,
        userID: action.payload,
      };
    case ActionType.ROOMID:
      return {
        ...state,
        roomID: action.payload,
      };
    case ActionType.USERLIST:
      return {
        ...state,
        userList: action.payload,
      };
    case ActionType.RESTLIST:
      return {
        ...state,
        restList: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
