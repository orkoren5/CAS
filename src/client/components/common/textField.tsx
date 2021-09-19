import React from "react";
import MuiTextField, {TextFieldProps as MuiTextFieldProps} from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        backgroundColor: "#0D182C"
    },
    inputInput: {
        padding: "6px 0 7px 8px",
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.7)"
    },
    withLabel: {
        marginTop: "24px !important"
    }
}));

const TextField = (props: MuiTextFieldProps) => {
    const classes = useStyles();

    return <MuiTextField
        {...props}
        InputLabelProps={{
            shrink: true,
        }}
        InputProps={{
            classes: {
                root: classes.inputRoot + " " + (props.label ? classes.withLabel : ""),
                input: classes.inputInput
            }
        }}
    />
}

export default TextField;