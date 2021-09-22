import {AnyAction} from "redux";
import {buildScenario, Scenario} from "../../common/types/Scenario";
import {ADD_SCENARIO, apiRequest, apiSuccess, DELETE_SCENARIO, EDIT_SCENARIO} from "./consts";

export interface MainState {
    scenarios: Record<string, Scenario>
}

const initialState: MainState = {
    scenarios: {
        "aaa": {
            "id": "aaa",
            "name": "fghf",
            "description": "fgh",
            "lat": 44,
            "long": 66,
            "km": 11,
            "lastSaveDate": new Date(),
            "creationDate": new Date(),
            "targets": [
                {
                    "id": "1",
                    "name": "ssfsd",
                    "provider": "78",
                    "imei": 7897,
                    "imsi": 6789679
                }
            ],
            "providers": [
                {
                    "provider": "partner",
                    "mcc": 425,
                    "mnc": 1,
                    "btsCounter": {
                        "all": 50,
                        "gsm": 25,
                        "umts": 12,
                        "lte": 13
                    },
                    "ueNumber": 1344
                },
                {
                    "provider": "cellcom",
                    "mcc": 425,
                    "mnc": 2,
                    "btsCounter": {
                        "all": 28,
                        "gsm": 14,
                        "umts": 14,
                        "lte": 0
                    },
                    "ueNumber": 567
                }
            ]
        }
    }
}

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case apiRequest(ADD_SCENARIO):
        case apiRequest(EDIT_SCENARIO):
        case apiRequest(DELETE_SCENARIO):
            return state;
        case apiSuccess(ADD_SCENARIO):
        case apiSuccess(EDIT_SCENARIO):
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    [action.payload.id]: action.payload
                }
            };
        case apiSuccess(DELETE_SCENARIO): {
            const newScenarios = state.scenarios;
            delete newScenarios[action.payload];
            return {
                ...state,
                scenarios: newScenarios
            }
        }
        default:
            return state;
    }
}

export default reducer;