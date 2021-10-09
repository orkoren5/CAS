import React from "react";
import Table, {TableProps} from "../common/table";
import {Target} from "../../../common/types/Target";
import TextField from "../common/textField";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import cx from "classNames";
import {styled} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import {TextFieldProps} from "@material-ui/core";
import Check from "@material-ui/icons/Check";

const targetCols = ["name", "provider", "imei", "imsi", "delete"];
const targetHeaders: TableProps["headers"] = [["Name", "Provider", "IMEI", "IMSI", ""]];

const TargetTextField = (props: TextFieldProps & { target: Target, fieldName: keyof Target, editTarget: (target: Target) => void }) => {
    const { target, fieldName, editTarget, ...textFieldProps } = props;
    return <TextField
        onBlur={(e) => {
            const newTarget = { ...target, [fieldName]: e.target.value }
            editTarget(newTarget);
        }}
        fullWidth
        defaultValue={target[fieldName]}
        {...textFieldProps}
    />;
}

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#172A42",
    fontSize: 12,
    maxWidth: 100
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    fontStyle: "italic",
    color: "#5e7a9b",
    fontSize: "12px !important"
}));

const StyledCheck = styled(Check)(({ theme }) => ({
    fontSize: 18,
    marginRight: 10
}));

const StyledDiv = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    "&.no-targets": {
        flexDirection: "column",
        alignItems: "flex-start",
    }
}));

interface TargetTableProps {
    targets: Target[];
    editable: boolean;
    loadToManipulation: boolean;
    setLoadToManipulation: (value: boolean) => void;
    editTarget: (target: Target) => void;
    deleteTarget: (id: string) => void;
    addTarget: () => void;
}

const TargetTable = (props: TargetTableProps) => {
    const targetRows: TableProps["rows"] = props.targets.map(target => ({
        key: target.id,
        name: <TargetTextField disabled={!props.editable} target={target} editTarget={props.editTarget} fieldName="name"/>,
        provider: <TargetTextField disabled={!props.editable} target={target} editTarget={props.editTarget} fieldName="provider"/>,
        imei: <TargetTextField disabled={!props.editable} target={target} editTarget={props.editTarget} fieldName="imei"/>,
        imsi: <TargetTextField disabled={!props.editable} target={target} editTarget={props.editTarget} fieldName="imsi"/>,
        delete: props.editable ? <IconButton onClick={() => props.deleteTarget(target.id)}><Delete/></IconButton> : ""
    }));

    return <div>
        <StyledDiv className={cx({"no-targets": props.targets.length === 0})}>
            <Typography variant="subtitle1" color="textPrimary">Targets ({props.targets.length})</Typography>
            <div>
                { props.targets.length > 0 &&
                    <StyledFormControlLabel
                        label="Load to manipulation"
                        color="textPrimary"
                        control={
                            props.editable ?
                                <Checkbox checked={props.loadToManipulation} disabled={!props.editable} onChange={(e) => props.setLoadToManipulation(e.target.checked)} color="default"/> :
                                props.loadToManipulation ? <StyledCheck/> : <></>
                        }
                    />
                    }
                { props.editable &&
                    <StyledButton onClick={props.addTarget} size="small" variant="outlined">Add Target</StyledButton>
                }
            </div>
        </StyledDiv>
        { props.targets.length > 0 &&
            <Table columns={targetCols} headers={targetHeaders} rows={targetRows}/>
        }
    </div>
}

export default TargetTable;