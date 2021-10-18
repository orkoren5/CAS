import {AnyAction} from "redux";
import {Scenario} from "../../../common/types/Scenario";
import {APPLY_FILTER, SET_SORT} from "./actions";

export interface FilterState {
    filterBy: null | "creationDate" | "lastSaveDate",
    fromDate: null | Scenario["creationDate"] | Scenario["lastSaveDate"];
    toDate: null | Scenario["creationDate"] | Scenario["lastSaveDate"];
    sort: {
        sortBy: keyof Scenario;
        sortDesc: boolean;
    }
}

const initialState: FilterState = {
    filterBy: null,
    fromDate: null,
    toDate: null,
    sort: {
        sortBy: "name",
        sortDesc: true
    }
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
        case SET_SORT: {
            const sortDesc = state.sort.sortBy === action.payload ? !state.sort.sortDesc : true;
            return  {
                ...state,
                sort: {
                    sortBy: action.payload,
                    sortDesc: sortDesc
                }
            }
        }
        default:
            return state;
    }
}

export default reducer;