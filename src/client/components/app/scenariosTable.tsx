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
import {useDispatch} from "react-redux";
import {deleteScenario} from "../../state/thunkActionCreators";

interface ScenariosTableProps {
    scenarios: Record<string, Scenario>;
    onAddScenarioClick: () => void;
}

const scenarioTableColumns = ["name", "description", "lastSaveDate", "lastRunDate", "edit", "delete"];
const scenarioTableHeaders = [["Scenario Name", "Description", "Last Save Date", "Last Run Date", "", ""]];

const useStyles = makeStyles(() => ({
    iconBtn: {
        padding: 8,
        margin: -8,
        // visibility: "hidden",
    }
}));

const ScenariosTable = (props: ScenariosTableProps) => {
    const list = Object.values(props.scenarios);
    const [selected, setSelected] = useState<Scenario>(list[0]);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        setSelected(list[0]);
        dispatch(deleteScenario(id));
    }

    const scenarioRows = list.map(scenario => ({
        key: scenario.id,
        name: scenario.name,
        description: scenario.description,
        lastSaveDate: scenario.lastSaveDate.toDateString(),
        lastRunDate: scenario.lastRunDate?.toDateString() || "",
        edit: <IconButton onClick={() => setSelected(scenario)} classes={{ root: classes.iconBtn }}><Edit/></IconButton>,
        delete: <IconButton onClick={() => handleDelete(scenario.id)}  classes={{ root: classes.iconBtn }}><Delete/></IconButton>
    }));

    return <>
        <div className="scenario-title-bar">
            <Typography color="textPrimary" variant="h6">Scenarios ({ list.length })</Typography>
            <Button variant="contained" color="primary" onClick={props.onAddScenarioClick}>Add new scenario</Button>
        </div>
        <div className="tables-container">
            <div className="scenario-table">
                <Table
                    columns={scenarioTableColumns}
                    headers={scenarioTableHeaders}
                    rows={scenarioRows}
                />
            </div>
            <ScenarioDetails scenario={selected}/>
        </div>

    </>
}

export default ScenariosTable;