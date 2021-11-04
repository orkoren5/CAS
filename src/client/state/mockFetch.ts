import type {ScenarioJSON} from "../../common/types/Scenario";
import {Provider} from "../../common/types/Provider";

type MockFetchRes<T> = { json: () => Promise<T>, status: number };

const initialScenarios: ScenarioJSON[] = [
    {
        "id": "aaa",
        "name": "fghf",
        "description": "fgh",
        "lat": 44,
        "long": 66,
        "km": 11,
        "lastSaveDate": new Date().toISOString(),
        "creationDate": new Date().toISOString(),
        "loadToManipulation": false,
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
                "ueNumber": 1344
            },
            {
                "provider": "cellcom",
                "mcc": 425,
                "mnc": 2,
                "ueNumber": 567
            },
            {
                "provider": "suny",
                "mcc": 425,
                "mnc": 2,
                "ueNumber": 567
            },
            {
                "provider": "hot-mobile",
                "mcc": 425,
                "mnc": 2,
                "ueNumber": 567
            }
        ]
    }
];

const wrapFetch = <T extends any>(jsonResponse: T, timeout = 0): Promise<MockFetchRes<T>> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                json: () => new Promise((res) => res(jsonResponse)),
                status: 200
            });
        }, timeout);
    });
}

const fetch = <T>(route: string, options: Record<string, any>): Promise<MockFetchRes<T>> => {
    const urlParts = route.split("?");
    switch (urlParts[0]) {
        case "/uploadCSV": {
            const csv = options.body.get("csv");

            const mockProviders: Provider[] = [
                {
                    provider: "partner",
                    mcc: 425,
                    mnc: 1,
                    ueNumber: 1344
                },
                {
                    provider: "cellcom",
                    mcc: 425,
                    mnc: 2,
                    ueNumber: 567
                }
            ]

            return wrapFetch(mockProviders, 1000);
        }
        case "/addScenario": {
            const scenario = options.body;
            const now = new Date().toISOString();
            return wrapFetch({...scenario, id: now, creationDate: now, lastSaveDate: now}, 0);
        }
        case "/editScenario": {
            const scenario = options.body;
            const now = new Date().toISOString();
            return wrapFetch({...scenario, lastSaveDate: now}, 0);
        }
        case "/getScenarios": {
            const list = initialScenarios;
            return wrapFetch(list, 0);
        }
        case "/deleteScenario":
        case "/runScenario":
            return wrapFetch("OK", 0);
    }
    return new Promise(resolve => resolve(wrapFetch("")));
}

export default fetch;