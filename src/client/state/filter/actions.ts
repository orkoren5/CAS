import {ActionCreator, AnyAction} from "redux";
import {FilterState} from "./reducer";

export const APPLY_FILTER = "APPLY_FILTER";

export const applyFilter: ActionCreator<AnyAction> = ({ filterBy, fromDate, toDate }: FilterState) => ({
    type: APPLY_FILTER,
    payload: { filterBy, fromDate, toDate }
});