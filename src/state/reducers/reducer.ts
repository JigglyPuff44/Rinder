import { ActionType } from "../action-types/index";
import { Action } from "../actions";

// export interface State {
//   user_id: number;
//   isLoggedIn: boolean;
//   roomID: string;
//   userList: [];
//   restList: [];
//   restResult: {};
//   name: string;
// }

const initialState = {
  user_id: 0,
  isLoggedIn: false,
  roomID: "",
  userList: [],
  restList: [],
  restResult: {},
  name: ""
};

const reducer = (state: object = initialState, action: Action): object => {
  switch (action.type) {
    case ActionType.USERID:
      return {
        ...state,
        user_id: action.payload,
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
    case ActionType.RESTRESULT:
      return {
        ...state,
        restResult: action.payload,
      };
    case ActionType.NAME:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
