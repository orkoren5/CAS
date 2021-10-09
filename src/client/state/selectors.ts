import type {GlobalState} from "../store";
import {createSelector} from "reselect";
import {getFilters} from "./filter/selectors";

const defaultRunStatus = {
    status: "stopped",
    stations: []
};

export const getScenarios = (state: GlobalState) => Object.values(state.data.scenarios);
export const getFilteredScenarios = createSelector(getScenarios, getFilters, (scenarios, filters) => {
    return scenarios.filter(scenario => {
        const dateField = filters.filterBy;
        return !dateField ||
            (
                filters.fromDate ? scenario[dateField] >= filters.fromDate : true &&
                filters.toDate ? scenario[dateField] <= filters.toDate : true
            )
    })
});

export const getScenarioById = (id: string) => (state: GlobalState) => state.data.scenarios[id];
export const getRunStatus = (id: string) => (state: GlobalState) => state.data.runStatus[id] || defaultRunStatus;