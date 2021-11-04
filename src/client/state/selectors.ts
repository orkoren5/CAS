import type {GlobalState} from "../store";
import {createSelector} from "reselect";
import {getFilters, getSort} from "./filter/selectors";
import {Scenario} from "../../common/types/Scenario";

const defaultRunStatus = {
    status: "stopped",
    stations: []
};

export const getScenarios = (state: GlobalState) => state.data.scenarios

export const getFilteredAndSortedScenarios = createSelector(getScenarios, getFilters, getSort, (scenariosMap, filters, sort) => {
    if (!scenariosMap) {
        return  [];
    }
    const scenarios = Object.values(scenariosMap).filter(scenario => {
        const dateField = filters.filterBy;
        return !dateField ||
            (
                filters.fromDate ? scenario[dateField] >= filters.fromDate : true &&
                filters.toDate ? scenario[dateField] <= filters.toDate : true
            )
    });

    const dir = sort.sortDesc ? -1 : 1;
    return scenarios.sort((s1, s2) => {
        return (s1[sort.sortBy] as any) > (s2[sort.sortBy] as any) ? dir : (dir * -1);
    })
});

export const getScenarioById = (id: string) => (state: GlobalState) => (state.data.scenarios as Record<string, Scenario>)[id];
export const getRunStatus = (id: string) => (state: GlobalState) => state.data.runStatus[id] || defaultRunStatus;