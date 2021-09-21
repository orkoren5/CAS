import {ADD_SCENARIO_REQUEST, ADD_SCENARIO_SUCCESS} from "./consts";
import {ActionCreator, AnyAction} from "redux";
import {Scenario} from "../../common/types/Scenario";

export const addScenarioRequest: ActionCreator<AnyAction> = () => {
    return {
        type: ADD_SCENARIO_REQUEST
    }
}
export const addScenarioSuccess: ActionCreator<AnyAction> = (scenario: Scenario) => {
    return {
        type: ADD_SCENARIO_SUCCESS,
        payload: scenario
    }
}