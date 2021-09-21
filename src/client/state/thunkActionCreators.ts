import {ThunkAction} from "redux-thunk";
import {GlobalState} from "../store";
import {AnyAction} from "redux";
import fetch from "./mockFetch";
import {Scenario} from "../../common/types/Scenario";
import {addScenarioRequest, addScenarioSuccess} from "./actions";

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

    const response = await fetch<Scenario>("/addScenario", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: scenario
    });

    const newScenario = await response.json();
    if (response.status === 200 || response.status === 204) {
        dispatch(addScenarioSuccess(newScenario));
    }
}
