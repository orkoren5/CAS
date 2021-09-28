import {ActionCreator, AnyAction} from "redux";

export const SET_CONFIG = "SET_CONFIG";

export const setConfig: ActionCreator<AnyAction> = (confName: string, confData: any) => ({
    type: SET_CONFIG,
    payload: { confName, confData }
});