import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./scenariosTable.scss";
import ScenarioDetails from "./scenarioDetails";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {deleteScenario, runScenario} from "../../state/thunkActionCreators";
import {getFilteredScenarios, getScenarioById} from "../../state/selectors";
//@ts-ignore
import FilterEmpty from "../../assets/icons/filter-empty.svg";
//@ts-ignore
import FilterFull from "../../assets/icons/filter-full.svg";
import FilterDialog from "./filterDialog";
import dateformat from "dateformat";
import {useHistory} from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import cx from "classNames";
import {useTableStyles} from "../common/table";
import {getFilters} from "../../state/filter/selectors";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";

interface ScenariosTableProps {
    onAddScenarioClick: () => void;
}

const scenarioTableColumns = ["name", "description", "lastSaveDate", "lastRunDate", "edit", "delete"];

const useStyles = makeStyles((theme) => ({
    iconBtn: {
        padding: 8,
        margin: -8,
    },
    invisibleIconBtn: {
        padding: 8,
        margin: -8,
        visibility: "hidden",
    },
    scenarioTableRow: {
        "&:hover $invisibleIconBtn": {
            visibility: "visible"
        }
    },
    tooltipTitle: {
        color: theme.palette.text.primary
    },
    tooltipValue: {
        color: theme.palette.text.secondary
    },
    filterBy: {
        gridColumn: "1 / span 2"
    },
    tooltipGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: 3,
        rowGap: 10
    },
    descCell: {
        maxWidth: 300
    }
}));

const ScenariosTable = (props: ScenariosTableProps) => {
    const scenarios = useSelector(getFilteredScenarios);
    const [selected, setSelected] = useState<string>(scenarios[0]?.id);
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const scenario = useSelector(getScenarioById(selected)) || scenarios[0] || null;
    const filter = useSelector(getFilters);
    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteScenario(id));
    }

    const handleRunScenario = () => {
        dispatch(runScenario(scenario.id));
        history.push("/run/" + scenario.id);
    }

    const tableStyle = useTableStyles();
    const hasFilter = filter.filterBy && (filter.toDate || filter.fromDate);
    const title = filter.filterBy === "creationDate" ? "Creation Date" : "Last Save Date"
    const filterIcon = hasFilter ?
        <Tooltip arrow title={
            <>
                <div className={classes.tooltipGrid}>
                    <Typography color="textPrimary" variant="body1" className={classes.filterBy}>{title}</Typography>
                    <Typography color="textPrimary" variant="body2">From:</Typography>
                    <Typography color="textSecondary" variant="body2">{filter.fromDate ? moment(filter.fromDate).format("DD.MM.YY") : "-"}</Typography>
                    <Typography color="textPrimary" variant="body2">To:</Typography>
                    <Typography color="textSecondary" variant="body2">{filter.toDate ? moment(filter.toDate).format("DD.MM.YY") : "-"}</Typography>
                </div>
            </>
        }>
            <IconButton classes={{root: classes.iconBtn}} onClick={() => setFilterOpen(true)}><FilterFull/></IconButton>
        </Tooltip> :
        <IconButton classes={{root: classes.iconBtn}} onClick={() => setFilterOpen(true)}><FilterEmpty/></IconButton>;

    return <>
        <div className="scenario-title-bar">
            <Typography color="textPrimary" variant="h5">Scenarios ({ scenarios.length })</Typography>
            <Button variant="contained" color="primary" onClick={props.onAddScenarioClick} disabled={editMode}>Add new scenario</Button>
        </div>
        <div className="tables-container">
            <div className="scenario-table">
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow classes={{root: tableStyle.tableRow}}>
                            <TableCell>Scenario Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Last Save Date</TableCell>
                            <TableCell>Last Run Date</TableCell>
                            <TableCell style={{width: 10}}/>
                            <TableCell style={{width: 10}}>{filterIcon}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            scenarios.map(scenario => (
                                <TableRow classes={{root: cx(tableStyle.tableRow, tableStyle.tableRowHover, classes.scenarioTableRow)}} key={scenario.id}>
                                    <TableCell><Typography color="textSecondary" variant="body2">{scenario.name}</Typography></TableCell>
                                    <TableCell classes={{root: classes.descCell}}>
                                        <Tooltip arrow placement="top-start" title={scenario.description} >
                                            <Typography color="textSecondary" variant="body2">{scenario.description}</Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell><Typography color="textSecondary" variant="body2">{dateformat(scenario.lastSaveDate, "dd.mm.yy hh:MM")}</Typography></TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="body2">
                                            {scenario.lastRunDate ? dateformat(scenario.lastRunDate, "dd.mm.yy hh:MM") : ""}
                                        </Typography>
                                    </TableCell>
                                    <TableCell><IconButton onClick={() => setSelected(scenario.id)} classes={{ root: classes.invisibleIconBtn }}><Edit/></IconButton></TableCell>
                                    <TableCell><IconButton onClick={() => handleDelete(scenario.id)} classes={{ root: classes.invisibleIconBtn }}><Delete/></IconButton></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
            { scenario && <ScenarioDetails scenario={scenario} editMode={editMode} setEditMode={setEditMode}/>}
            <div className="run-scenario-bar">
                <Button onClick={handleRunScenario} disabled={editMode || !scenario} variant="contained" color="primary">Run scenario</Button>
            </div>
        </div>
        <FilterDialog onClose={() => setFilterOpen(false)} open={filterOpen}/>
    </>
}

export default ScenariosTable;