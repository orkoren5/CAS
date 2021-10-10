import React, {useState} from "react";
import Table, {TableProps} from "../common/table";
import {Provider, Technology} from "../../../common/types/Provider";
import TextField from "../common/textField";
import Typography from "@material-ui/core/Typography";
import {TextFieldProps} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import BTSListDialog from "./btsListDialog";
import {useGetConfig} from "../../state/configuration/useGetConfig";
import DynamicIcon from "../common/dynamicIcon";

const providerCols = ["network", "mcc", "mnc", "all", "gsm", "umts", "lte", "ues number"];
const providerHeaders: TableProps["headers"] = [
    ["Network", "MCC", "MNC", { title: "BTScounter", colspan: 4}, "UEs Number"],
    [{ title: "", colspan: 3}, "All", "GSM", "UMTS", "LTE", ""]
];

const useStyles = makeStyles((theme) => ({
    titleRoot: {
        marginBottom: 15
    },
    link: {
        textDecoration: "underline",
        cursor: "pointer"
    },
    network: {
        display: "flex",
        alignItems: "center",
        gap: 16
    }
}));

const ProviderTextField = (props: TextFieldProps & { provider: Provider, fieldName: keyof Provider, editProvider: (provider: Provider) => void }) => {
    const { provider, fieldName, editProvider, ...textFieldProps } = props;
    return <TextField
        onChange={(e) => {
            const newProvider = { ...provider, [fieldName]: e.target.value }
            editProvider(newProvider);
        }}
        fullWidth
        value={provider[fieldName]}
        {...textFieldProps}
    />;
}

interface ProviderTableProps {
    editable: boolean;
    providers: Provider[],
    editProvider: (provider: Provider) => void;
    onShowBtsList?: (provider: string, technology?: Technology) => void;
}

const ProviderTable = (props: ProviderTableProps) => {
    const classes = useStyles();

    const providerConf = useGetConfig("providers") || {};
    const [dialogData, setDialogData] = useState<{ provider?: string, technology?: Technology }>({});

    const providerRows: TableProps["rows"] = props.providers.map(data => ({
        key: data.provider,
        network: <div className={classes.network}>
            { providerConf[data.provider]?.icon && <DynamicIcon iconUrl={providerConf[data.provider].icon}/> }
            <Typography color="textSecondary" variant="body2">{providerConf[data.provider]?.title}</Typography>
        </div>,
        mcc: <ProviderTextField disabled={!props.editable} fieldName="mcc" provider={data} editProvider={props.editProvider}/>,
        mnc: <ProviderTextField disabled={!props.editable} fieldName="mnc" provider={data} editProvider={props.editProvider}/>,
        all: <Typography
            color="textSecondary"
            variant="body2"
            classes={{root: classes.link}}
            onClick={() => props.onShowBtsList ? props.onShowBtsList(data.provider) : setDialogData({ provider: data.provider })}
        >
            {Object.values(providerConf[data.provider]?.btsList || []).reduce((sum, list) => sum + list.length, 0)}
        </Typography>,
        gsm: <Typography
            color="textSecondary"
            variant="body2"
            classes={{root: classes.link}}
            onClick={() => props.onShowBtsList ? props.onShowBtsList(data.provider, "gsm") : setDialogData({provider: data.provider, technology: "gsm"})}
        >
            {providerConf[data.provider]?.btsList.gsm.length || 0}
        </Typography>,
        umts: <Typography
            color="textSecondary"
            variant="body2"
            classes={{root: classes.link}}
            onClick={() => props.onShowBtsList ? props.onShowBtsList(data.provider, "umts") : setDialogData({provider: data.provider, technology: "umts"})}
        >
            {providerConf[data.provider]?.btsList.umts.length || 0}
        </Typography>,
        lte: <Typography
            color="textSecondary"
            variant="body2"
            classes={{root: classes.link}}
            onClick={() => props.onShowBtsList ? props.onShowBtsList(data.provider, "lte") : setDialogData({provider: data.provider, technology: "lte"})}
        >
            {providerConf[data.provider]?.btsList.lte.length || 0}
        </Typography>,
        "ues number": <ProviderTextField disabled={!props.editable} fieldName="ueNumber" provider={data} editProvider={props.editProvider}/>,
    }));

    return <div>
        <Typography classes={{ root: classes.titleRoot }} variant="subtitle1" color="textPrimary">Providers ({props.providers.length})</Typography>
        <Table columns={providerCols} headers={providerHeaders} rows={providerRows}/>
        <BTSListDialog onClose={() => setDialogData({})} open={!!dialogData.provider} provider={dialogData.provider || ""} technology={dialogData.technology}/>
    </div>
}

export default ProviderTable;