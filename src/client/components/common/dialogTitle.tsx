import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import {makeStyles} from "@material-ui/core/styles";

interface DialogTitleProps {
    title: string;
    onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "11px 20px"
    }
}));

const DialogTitle = ({ title, onClose }: DialogTitleProps ) => {
    const classes = useStyles();
    return <MuiDialogTitle color="secondary" disableTypography classes={classes}>
        <Typography variant="h5" color="textPrimary">{title}</Typography>
        <IconButton onClick={onClose}>
            <CloseIcon />
        </IconButton>
    </MuiDialogTitle>
}

export default DialogTitle;