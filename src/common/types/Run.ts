export enum SystemMode {
    Scanning,
    Manipulation,
    StandBy,
    Diagnostic
}

export interface Station {
    mode: SystemMode,
    btsStatuses: boolean[];
    paStatuses: boolean[];
    scannerStatuses: boolean[];
}