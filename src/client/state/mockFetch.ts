import {ProviderData} from "../components/ScenarioDialog/stepTwo";

type MockFetchRes<T> = { json: () => Promise<T>, status: number };

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

            const mockProviders: ProviderData[] = [
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
            return wrapFetch({...scenario, id: now, creationDate: now, lastSaveDate: now}, 1000);
        }
        case "/editScenario": {
            const scenario = options.body;
            const now = new Date().toISOString();
            return wrapFetch({...scenario, lastSaveDate: now}, 1000);
        }
        case "/deleteScenario":
        case "/runScenario":
            return wrapFetch("OK", 0);
    }
    return new Promise(resolve => resolve(wrapFetch("")));
}

export default fetch;