import type {GlobalState} from "../store";
import {createSelector} from "reselect";

export const getScenarios = (state: GlobalState) => state.data.scenarios;
export const getScenarioById = (id: string) => (state: GlobalState) => state.data.scenarios[id];