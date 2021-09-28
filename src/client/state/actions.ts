import {
    ADD_SCENARIO,
    apiRequest,
    apiSuccess,
    CHANGE_BTS_STATUS,
    CHANGE_PA_STATUS, CHANGE_SCANNER_STATUS, CHANGE_STATION_MODE,
    DELETE_SCENARIO,
    EDIT_SCENARIO, RUN_SCENARIO, STOP_SCENARIO
} from "./consts";
import {ActionCreator, AnyAction} from "redux";
import {Scenario} from "../../common/types/Scenario";
import {SystemMode} from "../../common/types/Run";

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

export const changeBTSStatus: ActionCreator<AnyAction> = (scenarioId: string, stationIndex: number, statusIndex: number, ok: boolean) => ({
    type: CHANGE_BTS_STATUS,
    payload: { scenarioId, ok, stationIndex, statusIndex }
});
export const changePAStatus: ActionCreator<AnyAction> = (scenarioId: string, stationIndex: number, statusIndex: number, ok: boolean) => ({
    type: CHANGE_PA_STATUS,
    payload: { scenarioId, ok, stationIndex, statusIndex }
});
export const changeScannerStatus: ActionCreator<AnyAction> = (scenarioId: string, stationIndex: number, ok: boolean) => ({
    type: CHANGE_SCANNER_STATUS,
    payload: { scenarioId, ok, stationIndex }
});

export const changeStationMode: ActionCreator<AnyAction> = (scenarioId: string, stationIndex: number, mode: SystemMode) => ({
    type: CHANGE_STATION_MODE,
    payload: { scenarioId, mode, stationIndex }
});

export const runScenario: ActionCreator<AnyAction> = (scenarioId: string) => ({
    type: RUN_SCENARIO,
    payload: scenarioId
});
export const stopScenario: ActionCreator<AnyAction> = (scenarioId: string) => ({
    type: STOP_SCENARIO,
    payload: scenarioId
});