import React, {useRef, useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "../common/textField";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import {makeStyles, styled} from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

interface ScenarioTitleProps {
    title: string;
    onChangeTitle: (title: string) => void;
    editMode: boolean;
    onDelete: () => void;
    onEdit: (editMode: boolean) => void;
    onSave: (asNew: boolean) => void;
}

const StyledSaveButton = styled(Button)(({ theme }) => ({
    width: 120,
    height: 36,
    position: "relative",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
}));

const StyledArrowButton = styled(Button)(({ theme }) => ({
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 37,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: 9
}));


const useStyles = makeStyles(() => ({
    menu: {
        width: 157,
        backgroundColor: "#105ac1"
    },
    editableTitle: {
        fontSize: 22
    }
}));

const ScenarioTitle = (props: ScenarioTitleProps) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();

    return <div className="scenario-title">
        { props.editMode ?
            <TextField className="grow" defaultValue={props.title} onBlur={(e) => props.onChangeTitle(e.target.value)}/> :
            <Typography color="textPrimary" className="grow" variant="h6">{props.title}</Typography>

        }
        <StyledIconButton onClick={props.onDelete}><Delete/></StyledIconButton>
        <Button variant="outlined" onClick={() => props.onEdit(!props.editMode)}>{props.editMode ? "Cancel" : "Edit"}</Button>
        { props.editMode && <div>
                <StyledSaveButton onClick={() => setOpen(true)} ref={btnRef} variant="contained" color="primary">
                    Save
                </StyledSaveButton>
                <StyledArrowButton onClick={() => setOpen(true)} variant="contained" color="primary"><KeyboardArrowDown /></StyledArrowButton>
            </div>
        }
        <Menu
            id="fade-menu"
            classes={{
                paper: classes.menu
            }}
            anchorEl={btnRef?.current}
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Fade}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <MenuItem
                onClick={() => {
                    props.onSave(false);
                    setOpen(false);
                }}
            >
                Save
            </MenuItem>
            <MenuItem
                onClick={() => {
                    props.onSave(true);
                    setOpen(false);
                }}
            >
                Save As
            </MenuItem>
        </Menu>
    </div>
}

export default ScenarioTitle;