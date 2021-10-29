import React, {useRef} from "react";
import MuiTextField, {TextFieldProps as MuiTextFieldProps} from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import TextOverflow from "./textOverflow";

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        borderRadius: 3,
        "&.Mui-disabled": {
            border: "1px solid transparent"
        },
        "&:not(.Mui-disabled)": {
            backgroundColor: "#0D182C",
            border: "1px solid #1d3450"
        },
        "&:before": {
            borderBottom: "none !important"
        }
    },
    inputInput: {
        padding: "6px 0 7px 9px",
        fontSize: 14,
        lineHeight: "27px",
        height: "unset",
        color: theme.palette.text.secondary,
        textOverflow: "ellipsis",
        "&.Mui-disabled": {
            paddingLeft: 0
        }
    },
    withLabel: {
        marginTop: "22px !important"
    },
    labelShrink: {
        fontSize: 21
    }
}));

export type TextFieldProps = MuiTextFieldProps & {
    overflowTooltip?: boolean;
}

const TextField = (props: TextFieldProps) => {
    const classes = useStyles();
    const ref = useRef<HTMLInputElement>(null);
    const { overflowTooltip, ...textFieldProps} = props;
    const { input, root, ...othersClasses } = { input: props.InputProps?.classes?.input, root: props.InputProps?.classes?.input, ...props.InputProps?.classes}

    // if you just put the prop directly on the TextField it will screw up the DatePicker
    const inputRefProp = overflowTooltip ? { inputRef: ref } : {};

    const textField = <MuiTextField
        {...textFieldProps}
        {...inputRefProp}
        InputLabelProps={{
            shrink: true,
            classes: { shrink: classes.labelShrink },
            ...props.InputLabelProps
        }}
        InputProps={{
            ...props.InputProps,
            classes: {
                root: classes.inputRoot + " " + (props.label ? classes.withLabel : "") + " " + (root || ""),
                input: classes.inputInput + " " + (input || ""),
                ...othersClasses,
            }
        }}
    />;

    return overflowTooltip ? <TextOverflow refElem={ref?.current} trigger={props.disabled} innerText={props.value as string}>{textField}</TextOverflow> : textField;
}

export default TextField;