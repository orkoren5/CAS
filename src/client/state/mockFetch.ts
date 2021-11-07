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

const providers = {
    "partner": {
        "title": "Partner",
        "icon": "partner-logo.svg",
        "btsList": {
            "gsm": [
                {
                    "cellId": 1116,
                    "band": 900,
                    "channel": 1
                },
                {
                    "cellId": 2222,
                    "band": 2100,
                    "channel": 8
                },
                {
                    "cellId": 3333,
                    "band": 2100,
                    "channel": 3
                },
                {
                    "cellId": 4423,
                    "band": 900,
                    "channel": 1
                },
                {
                    "cellId": 4456,
                    "band": 2100,
                    "channel": 8
                },
                {
                    "cellId": 7643,
                    "band": 2100,
                    "channel": 3
                },
                {
                    "cellId": 9877,
                    "band": 900,
                    "channel": 1
                },
                {
                    "cellId": 3965,
                    "band": 2100,
                    "channel": 8
                },
                {
                    "cellId": 2706,
                    "band": 2100,
                    "channel": 3
                }
            ],
            "umts": [
                {
                    "cellId": 1114,
                    "band": 800,
                    "channel": 5
                },
                {
                    "cellId": 4432,
                    "band": 2100,
                    "channel": 1
                },
                {
                    "cellId": 2020,
                    "band": 790,
                    "channel": 3
                }
            ],
            "lte": [
                {
                    "cellId": 2222,
                    "band": 900,
                    "channel": 1
                },
                {
                    "cellId": 3323,
                    "band": 800,
                    "channel": 8
                },
                {
                    "cellId": 2021,
                    "band": 2021,
                    "channel": 7
                }
            ]
        }
    },
    "cellcom": {
        "title": "Cellcom",
        "icon": "cellcom-logo.svg",
        "btsList": {
            "gsm": [],
            "umts": [],
            "lte": []
        }
    },
    "hot-mobile": {
        "title": "Hot Mobile",
        "icon": "hot-mobile-logo.svg",
        "btsList": {
            "gsm": [],
            "umts": [],
            "lte": []
        }
    },
    "suny": {
        "title": "Suny",
        "icon": "sunny-logo.svg",
        "btsList": {
            "gsm": [],
            "umts": [],
            "lte": []
        }
    }
};

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

const fetch = <T>(route: string, options?: Record<string, any>): Promise<MockFetchRes<T>> => {
    const urlParts = route.split("?");
    switch (urlParts[0]) {
        case "/uploadCSV": {
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
        case "/configuration/providers.json": {
            return wrapFetch(providers, 0);
        }
        case "/addScenario": {
            const scenario = options?.body || {};
            const now = new Date().toISOString();
            return wrapFetch({...scenario, id: now, creationDate: now, lastSaveDate: now}, 0);
        }
        case "/editScenario": {
            const scenario = options?.body || {};
            const now = new Date().toISOString();
            return wrapFetch({...scenario, lastSaveDate: now}, 0);
        }
        case "/getScenarios": {
            return wrapFetch(initialScenarios, 0);
        }
        case "/deleteScenario":
        case "/runScenario":
            return wrapFetch("OK", 0);
    }
    return new Promise(resolve => resolve(wrapFetch("")));
}

export default fetch;