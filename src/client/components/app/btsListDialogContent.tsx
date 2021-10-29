import Typography from "@material-ui/core/Typography";
import DynamicIcon from "../common/dynamicIcon";
import Table from "../common/table";
import DialogContent from "@material-ui/core/DialogContent";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import DialogTitle from "../common/dialogTitle";
import useBTSList from "./useBTSList";
import {Technology} from "../../../common/types/Provider";

export const useStyles = makeStyles((theme) => ({
    contentRoot: {
        padding: "0 25px 25px 25px",
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
        gap: 10,
        alignItems: "center"
    },
    networkTitle: {
        marginRight: 10
    },
    tableContainer: {
        maxHeight: 800,
        overflow: "auto"
    }
}));

interface BtsListDialogContentProps {
    provider: string;
    technology?: Technology;
    onClose: () => void;
}

const BtsListDialogContent = (props: BtsListDialogContentProps) => {
    const classes = useStyles();
    const { list, rows, providerConf, cols, headers } = useBTSList(props.provider, props.technology);

    return <>
        <DialogTitle title={`BTS List (${list.length})`} onClose={props.onClose}/>
        <DialogContent classes={{root: classes.contentRoot}}>
            <div className={classes.networkBar}>
                <Typography className={classes.networkTitle} color="textPrimary" variant="body2">Network:</Typography>
                { providerConf.icon && <DynamicIcon iconUrl={providerConf.icon}/> }
                <Typography color="textSecondary" variant="body2">{providerConf.title}</Typography>
            </div>
            <div className={classes.tableContainer}>
                <Table headers={headers} columns={cols} rows={rows}/>
            </div>
        </DialogContent>
    </>
}

export default BtsListDialogContent;