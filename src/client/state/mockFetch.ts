import {ProviderData} from "../components/ScenarioDialog/stepTwo";

const fetch = (route: string, options: Record<string, any>): Promise<any> => {
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

            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(mockProviders);
                }, 1000);
            });
        }
    }
    return new Promise(resolve => resolve(""));
}

export default fetch;