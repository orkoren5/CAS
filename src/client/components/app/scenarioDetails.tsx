import React, {useState} from "react";
import {Scenario} from "../../../common/types/Scenario";
import ScenarioTitle from "./scenarioTitle";
import ProviderTable from "./providerTable";
import TargetTable from "./targetTable";
import {useDispatch} from "react-redux";
import {Provider} from "../../../common/types/Provider";
import {Target} from "../../../common/types/Target";
import {addScenario, deleteScenario, editScenario} from "../../state/thunkActionCreators";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import ScenarioMetadata from "./scenarioMetadata";

interface ScenarioDetailsProps {
    scenario: Scenario;
}

const ScenarioDetails = (props: ScenarioDetailsProps) => {
    const [editableScenario, setEditableScenario] = useState<Scenario | null>(null);
    const editMode = editableScenario !== null;
    const setEditMode = (editMode: boolean) => setEditableScenario(editMode ? props.scenario : null);
    const scenario = editableScenario || props.scenario;
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSaveScenario = (asNew: boolean) => {
        if (asNew) {
            dispatch(addScenario(editableScenario));
        }
        else  {
            dispatch(editScenario(editableScenario));
        }
        setEditMode(false);
    }

    const handleEditProvider = (provider: Provider) => {
        const scenario = editableScenario as Scenario;
        const index = scenario.providers.findIndex(p => p.provider === provider.provider);
        setEditableScenario({
            ...scenario,
            providers: [
                ...scenario.providers.slice(0, index),
                provider,
                ...scenario.providers.slice(index + 1)
            ]
        })
    }

    const handleEditTarget = (target: Target) => {
        const scenario = editableScenario as Scenario;
        const index = scenario.targets.findIndex(t => t.id === target.id);
        setEditableScenario({
            ...scenario,
            targets: [
                ...scenario.targets.slice(0, index),
                target,
                ...scenario.targets.slice(index + 1)
            ]
        })
    }

    const handleDeleteTarget = (id: string) => {
        const index = scenario.targets.findIndex(t => t.id === id);
        setEditableScenario({
            ...scenario,
            targets: [
                ...scenario.targets.slice(0, index),
                ...scenario.targets.slice(index + 1)
            ]
        })
    }

    const handleAddTarget = () => {
        const newTarget: Target = { id: new Date().getTime().toString(), name: "", imei: 0, imsi: 0, provider: "" };

        setEditableScenario({
            ...scenario,
            targets: [
                ...scenario.targets,
                newTarget
            ]
        })
    }

    const handleDeleteScenario = () => {
        dispatch(deleteScenario(props.scenario.id));
    }

    const handleChangeTitle = (title: string) => {
        setEditableScenario({...editableScenario as Scenario, name: title});
    }

    const handleRunScenario = () => {
        history.push("/run/" + scenario.id);
    }

    return <div className="scenario-details">
        <ScenarioTitle
            title={scenario.name}
            onChangeTitle={handleChangeTitle}
            editMode={editMode}
            onEdit={setEditMode}
            onDelete={handleDeleteScenario}
            onSave={handleSaveScenario}
        />
        <ScenarioMetadata editMode={editMode} scenario={scenario} setScenario={setEditableScenario}/>
        <ProviderTable
            key={"provider-" + editMode.toString()}
            editable={editMode}
            providers={scenario.providers}
            editProvider={handleEditProvider}
        />
        <TargetTable
            key={"target-" + editMode.toString()}
            editable={editMode}
            targets={scenario.targets}
            editTarget={handleEditTarget}
            deleteTarget={handleDeleteTarget}
            addTarget={handleAddTarget}
        />
        <div className="run-scenario-bar">
            <Button onClick={handleRunScenario} disabled={editMode} variant="contained" color="primary">Run scenario</Button>
        </div>
    </div>
}

export default ScenarioDetails;