import type {GlobalState} from "../store";

const defaultRunStatus = {
    status: "stopped",
    stations: []
};

export const getScenarios = (state: GlobalState) => state.data.scenarios;
export const getScenarioById = (id: string) => (state: GlobalState) => state.data.scenarios[id];
export const getRunStatus = (id: string) => (state: GlobalState) => state.data.runStatus[id] || defaultRunStatus;