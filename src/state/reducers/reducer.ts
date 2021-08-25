import { ActionType } from "../action-types/index";
import { Action } from "../actions";

export interface State {
  userID: number
  isLoggedIn: boolean
  roomID: string
}


const initialState = {
  userID: 0,
  isLoggedIn: false,
  roomID: ''
};

const reducer = (state: object = initialState, action: Action): object => {
  switch (action.type) {
    case ActionType.USERID:
      return {
        ...state,
        userID: action.payload
      };
    case ActionType.ROOMID:
      return {
        ...state,
        roomID: action.payload
      };
    default:
      return state;
  }
};



export default reducer;
