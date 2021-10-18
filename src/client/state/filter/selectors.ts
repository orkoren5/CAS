import {GlobalState} from "../../store";

export const getFilterBy = (state: GlobalState) => state.filter.filterBy;
export const getFilters = (state: GlobalState) => state.filter;
export const getSort = (state: GlobalState) => state.filter.sort;