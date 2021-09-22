import React from "react";
import Table, {TableProps} from "../common/table";
import {Provider} from "../../../common/types/Provider";
import TextField from "../common/textField";
import Typography from "@material-ui/core/Typography";
import {TextFieldProps} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const providerCols = ["network", "mcc", "mnc", "all", "gsm", "umts", "lte", "ues number"];
const providerHeaders: TableProps["headers"] = [
    ["Network", "MCC", "MNC", { title: "BTScounter", colspan: 4}, "UEs Number"],
    [{ title: "", colspan: 3}, "All", "GSM", "UMTS", "LTE", ""]
];

const useStyles = makeStyles((theme) => ({
    titleRoot: {
        marginBottom: 15
    }
}));

const ProviderTextField = (props: TextFieldProps & { provider: Provider, fieldName: keyof Provider, editProvider: (provider: Provider) => void }) => {
    return <TextField
        onBlur={(e) => {
            const newProvider = { ...props.provider, [props.fieldName]: e.target.value }
            props.editProvider(newProvider);
        }}
        fullWidth
        defaultValue={props.provider[props.fieldName]}
        {...props}
    />;
}

interface ProviderTableProps {
    editable: boolean;
    providers: Provider[],
    editProvider: (provider: Provider) => void;
}

const ProviderTable = (props: ProviderTableProps) => {
    const providerRows: TableProps["rows"] = props.providers.map(data => ({
        key: data.provider,
        network: <span>{data.provider}</span>,
        mcc: <ProviderTextField disabled={!props.editable} fieldName="mcc" provider={data} editProvider={props.editProvider}/>,
        mnc: <ProviderTextField disabled={!props.editable} fieldName="mnc" provider={data} editProvider={props.editProvider}/>,
        all: <span>{data.btsCounter.all}</span>,
        gsm: <span>{data.btsCounter.gsm}</span>,
        umts: <span>{data.btsCounter.umts}</span>,
        lte: <span>{data.btsCounter.lte}</span>,
        "ues number": <ProviderTextField disabled={!props.editable} fieldName="ueNumber" provider={data} editProvider={props.editProvider}/>,
    }));

    const classes = useStyles();
    return <div>
        <Typography classes={{ root: classes.titleRoot }} variant="subtitle1" color="textPrimary">Providers ({props.providers.length})</Typography>
        <Table columns={providerCols} headers={providerHeaders} rows={providerRows}/>
    </div>
}

export default ProviderTable;