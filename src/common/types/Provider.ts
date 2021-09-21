export interface Provider {
    provider: string,
    mcc: number;
    mnc: number;
    btsCounter: {
        gsm: number;
        umts: number;
        lte: number;
        all: number;
    },
    ueNumber: number;
}