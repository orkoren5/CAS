import {ThunkAction} from "redux-thunk";
import {GlobalState} from "../store";
import {AnyAction} from "redux";
import fetch from "./mockFetch";
import {buildScenario, Scenario, ScenarioJSON} from "../../common/types/Scenario";
import {
    addScenarioRequest,
    addScenarioSuccess,
    deleteScenarioRequest, deleteScenarioSuccess,
    editScenarioRequest,
    editScenarioSuccess
} from "./actions";

type ThunkActionCreator = (...args: any) => ThunkAction<void, GlobalState, any, AnyAction>;

export const uploadCSV: ThunkActionCreator = (file: File) => async (dispatch, getState) => {
    const formData = new FormData();
    formData.append("csv", file || "");

    const response = await fetch("/uploadCSV", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: formData
    });

    if (response.status === 200 || response.status === 204) {

    }
}

export const addScenario: ThunkActionCreator = (scenario: Omit<Scenario, "id">) => async (dispatch, getState) => {
    dispatch(addScenarioRequest());

    const response = await fetch<ScenarioJSON>("/addScenario", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: scenario
    });

    const json = await response.json();
    const newScenario = buildScenario(json);
    if (response.status === 200 || response.status === 204) {
        dispatch(addScenarioSuccess(newScenario));
    }
}

export const editScenario: ThunkActionCreator = (scenario: Scenario) => async (dispatch, getState) => {
    dispatch(editScenarioRequest());

    const response = await fetch<Scenario>("/editScenario", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: scenario
    });

    if (response.status === 200 || response.status === 204) {
        dispatch(editScenarioSuccess(scenario));
    }
}

export const deleteScenario: ThunkActionCreator = (id: string) => async (dispatch, getState) => {
    dispatch(deleteScenarioRequest());

    const response = await fetch<Scenario>("/deleteScenario?id=" + id, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin'
    });

    if (response.status === 200 || response.status === 204) {
        dispatch(deleteScenarioSuccess(id));
    }
}