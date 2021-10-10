export type BTS = { cellId: string, band: number, channel: number };
export type Technology = "gsm" | "umts" | "lte";

export interface Provider {
    provider: string,
    mcc: number;
    mnc: number;
    ueNumber: number;
}