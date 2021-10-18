import React, {useRef, useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "../common/textField";
import IconButton from "@material-ui/core/IconButton";
//@ts-ignore
import Delete from "../../assets/icons/delete-icon.svg"
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

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: 9
}));


const useStyles = makeStyles((theme) => ({
    menu: {
        width: 157,
        backgroundColor: "#105ac1"
    },
    editableTitle: {
        fontSize: 22
    },
    nameInput: {
        fontSize: theme.typography.h6.fontSize,
        padding: "6px 0 7px 9px",
        lineHeight: "27px",
        color: theme.palette.text.secondary,
    },
    saveBtnContainer: {
        "&:hover $saveBtn": {
            backgroundColor: theme.palette.action.hover
        },
        "&:hover $arrowBtn": {
            backgroundColor: "#105ac1"
        }
    },
    saveBtn: {
        width: 120,
        height: 36,
        position: "relative",
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0
    },
    arrowBtn: {
        "&:hover": {
            backgroundColor: "#105ac1"
        },
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: 37,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0
    }
}));

const ScenarioTitle = (props: ScenarioTitleProps) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const classes = useStyles();

    return <div className="scenario-title">
        { props.editMode ?
            <TextField className="grow" InputProps={{ classes: { input: classes.nameInput }}} key={props.title} defaultValue={props.title} onBlur={(e) => props.onChangeTitle(e.target.value)}/> :
            <Typography color="textPrimary" className="grow" variant="h6">{props.title}</Typography>

        }
        <StyledIconButton onClick={props.onDelete}><Delete/></StyledIconButton>
        <Button variant="outlined" onClick={() => props.onEdit(!props.editMode)}>{props.editMode ? "Cancel" : "Edit"}</Button>
        { props.editMode && <div className={classes.saveBtnContainer}>
                <Button classes={{ root: classes.saveBtn }} onClick={() => setOpen(true)} ref={btnRef} variant="contained" color="primary" >
                    Save
                </Button>
                <Button classes={{ root: classes.arrowBtn }} onClick={() => setOpen(true)} variant="contained" color="primary"><KeyboardArrowDown /></Button>
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
            PaperProps={{  }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: -43,
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