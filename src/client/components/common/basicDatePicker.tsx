import * as React from 'react';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from "./textField";
import DatePicker from "@mui/lab/DatePicker";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#072041",
        color: theme.palette.primary.main,
        width: "280px !important",
        "& svg": {
            color: theme.palette.primary.main
        },
        "& .MuiTypography-root": {
            color: "#5e7a9b"
        },
        "& .MuiPickersDay-root": {
            color: theme.palette.text.secondary,
            backgroundColor: "unset"
        },
        "& .MuiPickersDay-root.Mui-selected": {
            backgroundColor: theme.palette.primary.main
        }
    },
}));

const usePaperStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#072041 !important",
        transform: "translate(4px, 0) !important",
        "& > div > div": {
            width: 278
        }
    },
}));

const useBtnStyles = makeStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary + " !important",
        marginLeft: "-40px !important"
    },
}));

interface BasicDatePickerProps {
    value: Date | null,
    setValue: (value: Date | null) => void;
}

export default function BasicDatePicker(props: BasicDatePickerProps) {
    const styles = useStyles();
    const paperStyles = usePaperStyles();
    const btnStyles = useBtnStyles();

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} dateFormats={{ keyboardDate: "DD/MM/yyyy" }}>
            <DatePicker
                PaperProps={{ classes: paperStyles }}
                OpenPickerButtonProps={{ classes: btnStyles }}
                //@ts-ignore
                classes={styles}
                value={props.value}
                onChange={props.setValue}
                renderInput={(params: any) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}