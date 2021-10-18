import {ActionCreator, AnyAction} from "redux";
import {FilterState} from "./reducer";
import {Scenario} from "../../../common/types/Scenario";

export const APPLY_FILTER = "APPLY_FILTER";
export const SET_SORT = "SET_SORT";

export const applyFilter: ActionCreator<AnyAction> = ({ filterBy, fromDate, toDate }: FilterState) => ({
    type: APPLY_FILTER,
    payload: { filterBy, fromDate, toDate }
});

export const setSort: ActionCreator<AnyAction> = (field: keyof Scenario) => ({
    type: SET_SORT,
    payload: field
});