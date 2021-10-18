import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./scenariosTable.scss";
import ScenarioDetails from "./scenarioDetails";
//@ts-ignore
import Edit from "../../assets/icons/edit-icon.svg"
//@ts-ignore
import Delete from "../../assets/icons/delete-icon.svg"
import {useDispatch, useSelector} from "react-redux";
import {deleteScenario, runScenario} from "../../state/thunkActionCreators";
import {getFilteredAndSortedScenarios, getScenarioById} from "../../state/selectors";
//@ts-ignore
import FilterEmpty from "../../assets/icons/filter-empty.svg";
//@ts-ignore
import FilterFull from "../../assets/icons/filter-full.svg";
import FilterDialog from "./filterDialog";
import {useHistory} from "react-router-dom";
import ScenarioTable from "./scenarioTable";

interface ScenariosPageProps {
    onAddScenarioClick: () => void;
}

const ScenariosPage = (props: ScenariosPageProps) => {
    const scenarios = useSelector(getFilteredAndSortedScenarios);
    const [selected, setSelected] = useState<string>(scenarios[0]?.id);
    const [filterOpen, setFilterOpen] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const scenario = useSelector(getScenarioById(selected)) || scenarios[0] || null;

    const history = useHistory();
    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteScenario(id));
    }

    const handleEdit = (id: string) => {
        setSelected(id);
        setEditMode(true);
    }

    const handleRunScenario = () => {
        dispatch(runScenario(scenario.id));
        history.push("/run/" + scenario.id);
    }

    return <>
        <div className="scenario-title-bar">
            <Typography color="textPrimary" variant="h5">Scenarios ({ scenarios.length })</Typography>
            <Button variant="contained" color="primary" onClick={props.onAddScenarioClick} disabled={editMode}>Add new scenario</Button>
        </div>
        <div className="tables-container">
            <div className="scenario-table">
                <ScenarioTable scenarios={scenarios} onSelect={setSelected} onDelete={handleDelete} onEdit={handleEdit} selected={selected}/>
            </div>
            { scenario && <ScenarioDetails scenario={scenario} editMode={editMode} setEditMode={setEditMode}/>}
            <div className="run-scenario-bar">
                <Button onClick={handleRunScenario} disabled={editMode || !scenario} variant="contained" color="primary">Run scenario</Button>
            </div>
        </div>
        <FilterDialog onClose={() => setFilterOpen(false)} open={filterOpen}/>
    </>
}

export default ScenariosPage;