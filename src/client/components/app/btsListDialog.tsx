import React from "react";
import Dialog, {DialogProps} from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useGetConfig} from "../../state/configuration/useGetConfig";
import Table, {TableProps} from "../common/table";
import {BTS, Technology} from "../../../common/types/Provider";

const useStyles = makeStyles((theme) => ({
    titleRoot: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "11px 20px"
    },
    contentRoot: {
        padding: 25,
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    actionsRoot: {
        backgroundColor: "#041127",
        flexDirection: "row-reverse",
        justifyContent: "space-between"
    },
    networkBar: {
        display: "flex",
        gap: 10
    },
    tableContainer: {
        maxHeight: 800,
        overflow: "auto"
    }
}));

const cols = ["cellId", "technology", "band", "channel"];
const headers: TableProps["headers"] = [["Cell ID", "Technology", "Band", "Channel"]];

export interface BTSListDialogProps extends DialogProps {
    onClose: () => void;
    provider: string;
    technology?: Technology
}

const BTSListDialog = (props: BTSListDialogProps) => {
    const providerConf = useGetConfig("providers") || {};
    const classes = useStyles();
    const provider = providerConf[props.provider] || { btsList: [] };

    let list: (BTS & { technology: string })[] = [];
    Object.keys(provider.btsList).forEach((technology) => {
        if (!props.technology || technology === props.technology) {
            //@ts-ignore
            const techList = provider.btsList[technology].map((bts: BTS) => ({...bts, technology}))
            list = [...list, ...techList];
        }
    });

    const rows: TableProps["rows"] = list.map((data, index) => ({
        key: index.toString(),
        cellId:  <Typography color="textSecondary" variant="body2">{data.cellId}</Typography>,
        technology: <Typography color="textSecondary" variant="body2">{data.technology.toUpperCase()}</Typography>,
        band: <Typography color="textSecondary" variant="body2">{data.band}</Typography>,
        channel: <Typography color="textSecondary" variant="body2">{data.channel}</Typography>,
    }));

    return <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth
        maxWidth="sm"
    >
        <DialogTitle color="secondary" disableTypography classes={{root: classes.titleRoot}}>
            <Typography variant="h5" color="textPrimary">BTS List ({list.length})</Typography>
            <IconButton onClick={props.onClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent classes={{root: classes.contentRoot}}>
            <div className={classes.networkBar}>
                <Typography color="textPrimary" variant="body2">Network:</Typography>
                <Typography color="textSecondary" variant="body2">{provider.title}</Typography>
            </div>
            <div className={classes.tableContainer}>
                <Table headers={headers} columns={cols} rows={rows}/>
            </div>
        </DialogContent>
    </Dialog>
}

export default BTSListDialog;