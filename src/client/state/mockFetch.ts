import {ProviderData} from "../components/ScenarioDialog/stepTwo";

type MockFetchRes<T> = { json: () => Promise<T>, status: number };

const wrapFetch = <T>(jsonResponse: T, timeout = 0): Promise<MockFetchRes<T>> => {
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
    switch (route) {
        case "/uploadCSV": {
            const csv = options.body.get("csv");

            const mockProviders: ProviderData[] = [
                {
                    provider: "partner",
                    mcc: 425,
                    mnc: 1,
                    btsCounter: {
                        all: 50,
                        gsm: 25,
                        umts: 12,
                        lte: 13
                    },
                    ueNumber: 1344
                },
                {
                    provider: "cellcom",
                    mcc: 425,
                    mnc: 2,
                    btsCounter: {
                        all: 28,
                        gsm: 14,
                        umts: 14,
                        lte: 0
                    },
                    ueNumber: 567
                }
            ]

            return wrapFetch(mockProviders, 1000);
        }
        case "/addScenario": {
            const scenario = options.body;
            const now = new Date().toISOString();
            return wrapFetch({...scenario, id: now, creationDate: now, lastSaveDate: now}, 1000);
        }
    }
    return new Promise(resolve => resolve(wrapFetch("")));
}

export default fetch;