import {ADD_SCENARIO} from "./consts";
import {ActionCreator, AnyAction} from "redux";
import {Scenario} from "../../common/types/Scenario";

export const addScenario: ActionCreator<AnyAction> = (scenario: Scenario) => {
    return {
        type: ADD_SCENARIO,
        payload: scenario
    }
}