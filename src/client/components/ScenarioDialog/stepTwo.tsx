import React, {FC} from "react";
import TextField from "../common/textField";
import {styled} from "@material-ui/core/styles";
import Table, {TableProps} from "../common/table";
import Button from "@material-ui/core/Button";
import cx from "classNames";

export interface StepTwoProps {
    providerData: ProviderData[];
    targets: (Target & {key: string})[],
    addTarget: () => void;
    deleteTarget: () => void;
    editTarget: (target: Target, index: number) => void;
}

export interface ProviderData {
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

export interface Target {
    name: string;
    provider: string;
    imei: number;
    imsi: number;
}

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#172A42",
    fontSize: 10,
    maxWidth: 100
}));

const providerCols = ["network", "mcc", "mnc", "all", "gsm", "umts", "lte", "ues number"];
const providerHeaders: TableProps["headers"] = [
    ["Network", "MCC", "MNC", { title: "BTScounter", colspan: 4}, "UEs Number"],
    [{ title: "", colspan: 3}, "All", "GSM", "UMTS", "LTE", ""]
];

const targetCols = ["name", "provider", "imei", "imsi"];
const targetHeaders: TableProps["headers"] = [["Name", "Provider", "IMEI", "IMSI"]];

const StepTwo: FC<StepTwoProps> = (props: StepTwoProps) => {
    const providerRows: TableProps["rows"] = props.providerData.map(data => ({
        key: data.provider,
        network: <span>{data.provider}</span>,
        mcc: <TextField fullWidth defaultValue={data.mcc}/>,
        mnc: <TextField defaultValue={data.mnc}/>,
        all: <span>{data.btsCounter.all}</span>,
        gsm: <span>{data.btsCounter.gsm}</span>,
        umts: <span>{data.btsCounter.umts}</span>,
        lte: <span>{data.btsCounter.lte}</span>,
        "ues number": <TextField defaultValue={data.ueNumber}/>
    }));

    const targetRows: TableProps["rows"] = props.targets.map(target => ({
        key: target.key,
        name: <TextField fullWidth defaultValue={target.name}/>,
        provider: <TextField fullWidth defaultValue={target.provider}/>,
        imei: <TextField fullWidth defaultValue={target.imei}/>,
        imsi: <TextField fullWidth defaultValue={target.imsi}/>,
    }));

    return <div className="step-two">
        <div>
            <span className="provider-title scenario-dialog__title">Providers ({props.providerData.length})</span>
            <Table columns={providerCols} headers={providerHeaders} rows={providerRows}/>
        </div>
        <div>
            <div className={cx("targets-title-bar", {"no-targets": props.targets.length === 0})}>
                <span className="provider-title scenario-dialog__title">Targets ({props.targets.length})</span>
                <StyledButton onClick={props.addTarget} size="small" variant="outlined">Add Target</StyledButton>
            </div>
            { props.targets.length > 0 &&
                <Table columns={targetCols} headers={targetHeaders} rows={targetRows}/>
            }
        </div>
    </div>
};

export default StepTwo;