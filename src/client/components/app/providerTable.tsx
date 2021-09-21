import React from "react";
import Table, {TableProps} from "../common/table";
import {Provider} from "../../../common/types/Provider";
import TextField from "../common/textField";

const providerCols = ["network", "mcc", "mnc", "all", "gsm", "umts", "lte", "ues number"];
const providerHeaders: TableProps["headers"] = [
    ["Network", "MCC", "MNC", { title: "BTScounter", colspan: 4}, "UEs Number"],
    [{ title: "", colspan: 3}, "All", "GSM", "UMTS", "LTE", ""]
];

const ProviderTextField = (props: { provider: Provider, fieldName: keyof Provider, editProvider: (provider: Provider) => void }) => {
    return <TextField
        onBlur={(e) => {
            const newProvider = { ...props.provider, [props.fieldName]: e.target.value }
            props.editProvider(newProvider);
        }}
        fullWidth
        defaultValue={props.provider[props.fieldName]}
    />;
}

interface ProviderTableProps {
    providers: Provider[],
    editProvider: (provider: Provider) => void;
}

const ProviderTable = (props: ProviderTableProps) => {
    const handleSetMCC = (provider: Provider, mcc: string) => {
        props.editProvider({...provider, mcc: Number(mcc)});
    }
    const handleSetMNC = (provider: Provider, mnc: string) => {
        props.editProvider({...provider, mcc: Number(mnc)});
    }

    const providerRows: TableProps["rows"] = props.providers.map(data => ({
        key: data.provider,
        network: <span>{data.provider}</span>,
        mcc: <ProviderTextField fieldName="mcc" provider={data} editProvider={props.editProvider}/>,
        mnc: <ProviderTextField fieldName="mnc" provider={data} editProvider={props.editProvider}/>,
        all: <span>{data.btsCounter.all}</span>,
        gsm: <span>{data.btsCounter.gsm}</span>,
        umts: <span>{data.btsCounter.umts}</span>,
        lte: <span>{data.btsCounter.lte}</span>,
        "ues number": <ProviderTextField fieldName="ueNumber" provider={data} editProvider={props.editProvider}/>,
    }));

    return <div>
        <span className="provider-title scenario-dialog__title">Providers ({props.providers.length})</span>
        <Table columns={providerCols} headers={providerHeaders} rows={providerRows}/>
    </div>
}

export default ProviderTable;