import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "../common/textField";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

interface ScenarioTitleProps {
    title: string;
    editMode: boolean;
    onDelete: () => void;
    onEdit: (editMode: boolean) => void;
    onSave: (asNew: boolean) => void;
}

const ScenarioTitle = (props: ScenarioTitleProps) => {
    return <div className="scenario-title">
        { props.editMode ?
            <TextField className="grow" defaultValue={props.title} onBlur={() => {}}/> :
            <Typography color="textPrimary" className="grow" variant="h6">{props.title}</Typography>

        }
        <IconButton><Delete/></IconButton>
        <Button variant="outlined" onClick={() => props.onEdit(!props.editMode)}>{props.editMode ? "Cancel" : "Edit"}</Button>
    </div>
}

export default ScenarioTitle;