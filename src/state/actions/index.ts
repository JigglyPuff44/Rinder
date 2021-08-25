import { ActionType } from "../action-types/index"

interface UseridAction {
    type: ActionType.USERID,
    payload: number
}

export type Action = UseridAction;
// export type Action = UseridAction | WithdrawAction | BankruptAction;