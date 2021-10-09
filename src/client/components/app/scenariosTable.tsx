import React, {useState} from "react";
import {Scenario} from "../../../common/types/Scenario";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./scenariosTable.scss";
import Table from "../common/table";
import ScenarioDetails from "./scenarioDetails";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {deleteScenario, runScenario} from "../../state/thunkActionCreators";
import {getScenarioById, getScenarios} from "../../state/selectors";
//@ts-ignore
import FilterEmpty from "../../assets/icons/filter-empty.svg"
import FilterDialog from "./filterDialog";
import dateformat from "dateformat";
import {useHistory} from "react-router-dom";

interface ScenariosTableProps {
    scenarios: Record<string, Scenario>;
    onAddScenarioClick: () => void;
}

const scenarioTableColumns = ["name", "description", "lastSaveDate", "lastRunDate", "edit", "delete"];

const useStyles = makeStyles(() => ({
    iconBtn: {
        padding: 8,
        margin: -8,
        // visibility: "hidden",
    }
}));

const ScenariosTable = (props: ScenariosTableProps) => {
    const list = Object.values(props.scenarios);
    const [selected, setSelected] = useState<string>(list[0].id);
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const allScenarios = useSelector(getScenarios);
    const scenario = useSelector(getScenarioById(selected)) || Object.values(allScenarios)[0];
    const classes = useStyles();

    const filterBtn = <IconButton classes={{root: classes.iconBtn}} onClick={() => setFilterOpen(true)}><FilterEmpty/></IconButton>;

    const scenarioTableHeaders = [["Scenario Name", "Description", "Last Save Date", "Last Run Date", "", {title: filterBtn}]];

    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteScenario(id));
    }

    const handleRunScenario = () => {
        dispatch(runScenario(scenario.id));
        history.push("/run/" + scenario.id);
    }

    const scenarioRows = list.map(scenario => ({
        key: scenario.id,
        name: scenario.name,
        description: scenario.description,
        lastSaveDate: dateformat(scenario.lastSaveDate, "dd.mm.yy hh:MM"),
        lastRunDate: scenario.lastRunDate ? dateformat(scenario.lastRunDate, "dd.mm.yy hh:MM") : "",
        edit: <IconButton onClick={() => setSelected(scenario.id)} classes={{ root: classes.iconBtn }}><Edit/></IconButton>,
        delete: <IconButton onClick={() => handleDelete(scenario.id)} classes={{ root: classes.iconBtn }}><Delete/></IconButton>
    }));

    return <>
        <div className="scenario-title-bar">
            <Typography color="textPrimary" variant="h5">Scenarios ({ list.length })</Typography>
            <Button variant="contained" color="primary" onClick={props.onAddScenarioClick} disabled={editMode}>Add new scenario</Button>
        </div>
        <div className="tables-container">
            <div className="scenario-table">
                <Table
                    columns={scenarioTableColumns}
                    headers={scenarioTableHeaders}
                    rows={scenarioRows}
                    hoverColor={true}
                />
            </div>
            <ScenarioDetails scenario={scenario} editMode={editMode} setEditMode={setEditMode}/>
            <div className="run-scenario-bar">
                <Button onClick={handleRunScenario} disabled={editMode} variant="contained" color="primary">Run scenario</Button>
            </div>
        </div>
        <FilterDialog onClose={() => setFilterOpen(false)} open={filterOpen}/>
    </>
}

export default ScenariosTable;