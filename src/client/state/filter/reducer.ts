import {AnyAction} from "redux";
import {Scenario} from "../../../common/types/Scenario";
import {APPLY_FILTER} from "./actions";

export interface FilterState {
    filterBy: null | "creationDate" | "lastSaveDate",
    fromDate: null | Scenario["creationDate"] | Scenario["lastSaveDate"];
    toDate: null | Scenario["creationDate"] | Scenario["lastSaveDate"];
}

const initialState: FilterState = {
    filterBy: null,
    fromDate: null,
    toDate: null
}

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case APPLY_FILTER: {
            return  {
                ...state,
                filterBy: action.payload.filterBy,
                fromDate: action.payload.fromDate,
                toDate: action.payload.toDate
            }
        }
        default:
            return state;
    }
}

export default reducer;