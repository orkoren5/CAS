import {AnyAction} from "redux";
import {buildScenario, Scenario} from "../../common/types/Scenario";
import {
    ADD_SCENARIO,
    apiRequest,
    apiSuccess,
    CHANGE_BTS_STATUS,
    CHANGE_PA_STATUS,
    CHANGE_SCANNER_STATUS,
    CHANGE_STATION_MODE,
    DELETE_SCENARIO,
    EDIT_SCENARIO,
    GET_SCENARIOS,
    RUN_SCENARIO,
    STOP_SCENARIO
} from "./consts";
import {Station, SystemMode} from "../../common/types/Run";
import {BTS} from "../../common/types/Provider";

export interface MainState {
    configuration: {
        providers: {
            [name: string]: {
                title: string;
                icon: any;
                btsList: {
                    gms: BTS[],
                    umts: BTS[],
                    lte: BTS[]
                }
            }
        }
    },
    scenarios: Record<string, Scenario> | null,
    runStatus: Record<string, {
        status: "running" | "stopped",
        stations: Station[];
    }>
}

const initialState: MainState = {
    configuration: {
        providers: {}
    },
    runStatus: {},
    scenarios: null
}

const changeStationStatus = (state: MainState, status: "paStatuses" | "btsStatuses" | "scannerStatuses", id: string, stationIndex: number, statusIndex: number, ok: boolean) => {
    const station = state.runStatus[id].stations[stationIndex];
    const statuses = [...station[status]];
    statuses[statusIndex] = ok;
    const newStation = { ...station, [status]: statuses };
    const newStations = [...state.runStatus[id].stations];
    newStations[stationIndex] = newStation;

    return  {
        ...state,
        runStatus: {
            ...state.runStatus,
            [id]: {
                ...state.runStatus[id],
                stations: newStations
            }
        }
    }
}

const getInitialStation = (): Station => ({
    mode: SystemMode.Scanning,
    btsStatuses: [false, false, false, false],
    paStatuses: [false, false, false, false],
    scannerStatuses: [false]
})

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        case apiRequest(GET_SCENARIOS):
        case apiRequest(ADD_SCENARIO):
        case apiRequest(EDIT_SCENARIO):
        case apiRequest(DELETE_SCENARIO):
            return state;
        case apiSuccess(GET_SCENARIOS):
            return {
                ...state,
                scenarios: action.payload
            }
        case apiSuccess(ADD_SCENARIO):
        case apiSuccess(EDIT_SCENARIO):
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    [action.payload.id]: buildScenario(action.payload)
                }
            };
        case apiSuccess(DELETE_SCENARIO): {
            const newScenarios = { ...state.scenarios };
            delete newScenarios[action.payload];
            return {
                ...state,
                scenarios: newScenarios
            }
        }
        case CHANGE_PA_STATUS: {
            const {scenarioId, stationIndex, statusIndex, ok} = action.payload;
            return changeStationStatus(state, "paStatuses", scenarioId, stationIndex, statusIndex, ok);
        }
        case CHANGE_BTS_STATUS: {
            const {scenarioId, stationIndex, statusIndex, ok} = action.payload;
            return changeStationStatus(state, "btsStatuses", scenarioId, stationIndex, statusIndex, ok);
        }
        case CHANGE_SCANNER_STATUS: {
            const {scenarioId, stationIndex, ok} = action.payload;
            return changeStationStatus(state, "scannerStatuses", scenarioId, stationIndex, 0, ok);
        }
        case CHANGE_STATION_MODE: {
            const {scenarioId, stationIndex, mode} = action.payload;
            const newStation: Station = { ...state.runStatus[scenarioId].stations[stationIndex], mode };
            const newStations = [...state.runStatus[scenarioId].stations];
            newStations[stationIndex] = newStation;

            return {
                ...state,
                runStatus: {
                    ...state.runStatus,
                    [scenarioId]: {
                        ...state.runStatus[scenarioId],
                        stations: newStations
                    }
                }
            }
        }
        case RUN_SCENARIO: {
            return {
                ...state,
                scenarios: {
                    ...state.scenarios,
                    [action.payload]: {
                        ...(state.scenarios as Record<string, Scenario>)[action.payload],
                        lastRunDate: new Date()
                    }
                },
                runStatus: {
                    ...state.runStatus,
                    [action.payload]: {
                        ...state.runStatus[action.payload],
                        status: "running",
                        stations: [
                            getInitialStation(),
                            getInitialStation(),
                            getInitialStation(),
                            getInitialStation(),
                            getInitialStation(),
                            getInitialStation()
                        ]
                    }
                }
            }
        }
        case STOP_SCENARIO: {
            return {
                ...state,
                runStatus: {
                    ...state.runStatus,
                    [action.payload.id]: {
                        ...state.runStatus[action.payload],
                        status: "stopped"
                    }
                }
            }
        }
        default:
            return state;
    }
}

export default reducer;