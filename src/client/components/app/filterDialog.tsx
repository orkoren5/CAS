import React, {useState} from "react";
import Dialog, {DialogProps} from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import TextField from "../common/textField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {useDispatch, useSelector} from "react-redux";
import {applyFilter} from "../../state/filter/actions";
import {FilterState} from "../../state/filter/reducer";
import {getFilters} from "../../state/filter/selectors";

const useStyles = makeStyles((theme) => ({
    titleRoot: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 0
    },
    dialogWidth: {
        maxWidth: 330
    },
    contentRoot: {
        padding: "0 25px 25px 25px",
        display: "flex",
        flexDirection: "column",
        gap: 15,
    },
    actionsRoot: {
        flexDirection: "column",
        alignItems: "stretch",
        gap: 20,
        padding: 25
    },
    filterButtons: {
        marginBottom: 13
    },
    actionsSpacing: {
        "& > :not(:first-child)": {
            margin: 0
        }
    },
    networkBar: {
        display: "flex",
        gap: 10
    },
    tableContainer: {
        maxHeight: 800,
        overflow: "auto"
    },
    grow: {
        flexGrow: 1
    }
}));

export interface FilterDialogProps extends DialogProps {
    onClose: () => void;
}

const FilterDialog = (props: FilterDialogProps) => {
    const classes = useStyles();

    return <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth
        maxWidth="sm"
        classes={{paperWidthSm: classes.dialogWidth}}
    >
        <FilterDialogContent onClose={props.onClose}/>
    </Dialog>
}

const FilterDialogContent = ({ onClose }: { onClose: () => void }) => {
    const classes = useStyles();
    const currentFilters = useSelector(getFilters);
    const [filterBy, setFilterBy] = useState<FilterState["filterBy"]>(currentFilters.filterBy);
    const [fromDate, setFrom] = useState<Date | null>(currentFilters.fromDate);
    const [toDate, setTo] = useState<Date | null>(currentFilters.toDate);

    const dispatch = useDispatch();

    const handleFilterByChange = (event: any, value: FilterState["filterBy"]) => {
        setFilterBy(value);
    }

    const handleFromChange = (event: any) => {
        setFrom(event.target.value);
    }
    const handleToChange = (event: any) => {
        setTo(event.target.value);
    }
    const handleClear = () => {
        dispatch(applyFilter({ filterBy: "creationDate", fromDate: null, toDate: null }));
        onClose();
    }
    const handleApply = () => {
        dispatch(applyFilter({ filterBy, fromDate, toDate }));
        onClose();
    }

    return <>
        <DialogTitle color="secondary" disableTypography classes={{root: classes.titleRoot}}>
            <IconButton onClick={onClose}>
                <CloseIcon/>
            </IconButton>
        </DialogTitle>
        <DialogContent classes={{root: classes.contentRoot}}>
            <Typography variant="body1" color="textPrimary">Filter By</Typography>
            <ToggleButtonGroup classes={{root: classes.filterButtons}} size="small" exclusive value={filterBy} onChange={handleFilterByChange}>
                <ToggleButton classes={{root: classes.grow}} value="creationDate">Creation
                    date</ToggleButton>
                <ToggleButton classes={{root: classes.grow}} value="lastSaveDate">Last save
                    date</ToggleButton>
            </ToggleButtonGroup>
            <Typography variant="body1" color="textPrimary">From</Typography>
            <TextField type="date" value={fromDate || ""} onChange={handleFromChange}/>
            <Typography variant="body1" color="textPrimary">To</Typography>
            <TextField type="date" value={toDate || ""} onChange={handleToChange}/>
        </DialogContent>
        <DialogActions classes={{root: classes.actionsRoot, spacing: classes.actionsSpacing}} color="primary">
            <Button classes={{root: classes.grow}} variant="contained" color="primary" onClick={handleApply}>
                Apply
            </Button>
            <Button classes={{root: classes.grow}} variant="outlined" onClick={handleClear}>
                Clear
            </Button>
        </DialogActions>
    </>
}

export default FilterDialog;