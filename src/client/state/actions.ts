import {ADD_SCENARIO, apiRequest, apiSuccess, DELETE_SCENARIO, EDIT_SCENARIO} from "./consts";
import {ActionCreator, AnyAction} from "redux";
import {Scenario} from "../../common/types/Scenario";

export const addScenarioRequest: ActionCreator<AnyAction> = () => ({
    type: apiRequest(ADD_SCENARIO)
})

export const addScenarioSuccess: ActionCreator<AnyAction> = (scenario: Scenario) => ({
    type: apiSuccess(ADD_SCENARIO),
    payload: scenario
});

export const editScenarioRequest: ActionCreator<AnyAction> = () => ({
    type: apiRequest(EDIT_SCENARIO)
})

export const editScenarioSuccess: ActionCreator<AnyAction> = (scenario: Scenario) => ({
    type: apiSuccess(EDIT_SCENARIO),
    payload: scenario
});

export const deleteScenarioRequest: ActionCreator<AnyAction> = () => ({
    type: apiRequest(DELETE_SCENARIO)
})

export const deleteScenarioSuccess: ActionCreator<AnyAction> = (id: string) => ({
    type: apiSuccess(DELETE_SCENARIO),
    payload: id
});