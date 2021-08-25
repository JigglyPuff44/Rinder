import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../actions/index"

export const newUserID = (userID: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.USERID,
            payload: userID
        })
    }
}