import React from "react";
import MuiTextField, {TextFieldProps as MuiTextFieldProps} from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        backgroundColor: "#0D182C",
        "&:before": {
            borderBottom: "none !important"
        }
    },
    inputInput: {
        padding: "6px 0 7px 8px",
        fontSize: 14,
        lineHeight: "27px",
        height: "unset",
        color: theme.palette.text.secondary,
        "&.Mui-disabled": {
            paddingLeft: 0
        }
    },
    withLabel: {
        marginTop: "32px !important"
    },
    labelShrink: {
        fontSize: 21
    }
}));

const TextField = (props: MuiTextFieldProps) => {
    const classes = useStyles();

    return <MuiTextField
        {...props}
        InputLabelProps={{
            ...props.InputLabelProps,
            shrink: true,
            classes: { shrink: classes.labelShrink }
        }}
        InputProps={{
            ...props.InputProps,
            classes: {
                root: classes.inputRoot + " " + (props.label ? classes.withLabel : ""),
                input: classes.inputInput
            }
        }}
    />
}

export default TextField;