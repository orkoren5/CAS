import {AnyAction} from "redux";
import type {BTS} from "../../../common/types/Provider";
import {SET_CONFIG} from "./actions";

export interface ConfState {
    providers: null | {
        [name: string]: {
            title: string;
            icon: string;
            btsList: {
                gsm: BTS[],
                umts: BTS[],
                lte: BTS[]
            }
        }
    }
}

const initialState: ConfState = {
    providers: null
}

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case SET_CONFIG:
            return {
                ...state,
                [action.payload.confName]: action.payload.confData
            }
        default:
            return state;
    }
}

export default reducer;