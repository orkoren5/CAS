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
import {deleteScenario} from "../../state/thunkActionCreators";
import {getScenarioById} from "../../state/selectors";
//@ts-ignore
import FilterEmpty from "../../assets/icons/filter-empty.svg"
import FilterDialog from "./filterDialog";
import dateformat from "dateformat";

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
    const scenario = useSelector(getScenarioById(selected));
    const classes = useStyles();

    const filterBtn = <IconButton classes={{root: classes.iconBtn}} onClick={() => setFilterOpen(true)}><FilterEmpty/></IconButton>;

    const scenarioTableHeaders = [["Scenario Name", "Description", "Last Save Date", "Last Run Date", "", {title: filterBtn}]];


    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        setSelected(list[0].id);
        dispatch(deleteScenario(id));
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
            <ScenarioDetails scenario={scenario}/>
        </div>
        <FilterDialog onClose={() => setFilterOpen(false)} open={filterOpen}/>
    </>
}

export default ScenariosTable;