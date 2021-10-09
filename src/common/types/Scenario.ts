import {Provider} from "./Provider";
import {Target} from "./Target";

export interface ScenarioJSON {
    id: string;
    name: string;
    description: string;
    long: number;
    lat: number;
    km: number;
    creationDate: string;
    lastSaveDate: string;
    lastRunDate?: string;
    providers: Provider[];
    targets: Target[];
    loadToManipulation: boolean;
}

export interface Scenario {
    id: string;
    name: string;
    description: string;
    long: number;
    lat: number;
    km: number;
    creationDate: Date;
    lastSaveDate: Date;
    lastRunDate?: Date;
    providers: Provider[],
    targets: Target[],
    loadToManipulation: boolean;
}

export const buildScenario = (scenarioJSON: ScenarioJSON) : Scenario => {
    return {
        ...scenarioJSON,
        creationDate: new Date(scenarioJSON.creationDate),
        lastSaveDate: new Date(scenarioJSON.lastSaveDate),
        lastRunDate: scenarioJSON.lastRunDate ? new Date(scenarioJSON.lastRunDate) : undefined,
    }
}