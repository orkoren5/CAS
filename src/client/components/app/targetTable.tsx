import React from "react";
import Table, {TableProps} from "../common/table";
import {Target} from "../../../common/types/Target";
import TextField from "../common/textField";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";

const targetCols = ["name", "provider", "imei", "imsi", "delete"];
const targetHeaders: TableProps["headers"] = [["Name", "Provider", "IMEI", "IMSI", ""]];

const TargetTextField = (props: { target: Target, fieldName: keyof Target, editTarget: (target: Target) => void }) => {
    return <TextField
        onBlur={(e) => {
            const newTarget = { ...props.target, [props.fieldName]: e.target.value }
            props.editTarget(newTarget);
        }}
        fullWidth
        defaultValue={props.target[props.fieldName]}
    />;
}

interface TargetTableProps {
    targets: Target[],
    editTarget: (target: Target) => void;
    deleteTarget: (id: string) => void;
}

const TargetTable = (props: TargetTableProps) => {
    const targetRows: TableProps["rows"] = props.targets.map(target => ({
        key: target.id,
        name: <TargetTextField target={target} editTarget={props.editTarget} fieldName="name"/>,
        provider: <TargetTextField target={target} editTarget={props.editTarget} fieldName="provider"/>,
        imei: <TargetTextField target={target} editTarget={props.editTarget} fieldName="imei"/>,
        imsi: <TargetTextField target={target} editTarget={props.editTarget} fieldName="imsi"/>,
        delete: <IconButton onClick={() => props.deleteTarget(target.id)}><Delete/></IconButton>
    }));

    return <Table columns={targetCols} headers={targetHeaders} rows={targetRows}/>
}

export default TargetTable;