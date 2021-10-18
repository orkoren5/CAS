import React, {useEffect, useState} from "react";
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
    editMode: boolean;
    setEditMode: (mode: boolean) => void;
}

const ScenarioDetails = (props: ScenarioDetailsProps) => {
    const [editableScenario, setEditableScenario] = useState<Scenario>(props.scenario);
    const scenario = props.editMode ? editableScenario : props.scenario;
    const dispatch = useDispatch();

    useEffect(() => {
        setEditableScenario(props.scenario);
    }, [props.editMode, props.scenario.id]);

    const handleSaveScenario = (asNew: boolean) => {
        if (asNew) {
            dispatch(addScenario(editableScenario));
        }
        else  {
            dispatch(editScenario(editableScenario));
        }
        props.setEditMode(false);
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
                newTarget,
                ...scenario.targets
            ]
        })
    }

    const handleDeleteScenario = () => {
        dispatch(deleteScenario(props.scenario.id));
    }

    const handleChangeTitle = (title: string) => {
        setEditableScenario({...editableScenario as Scenario, name: title});
    }

    const handleLoadToManipulation = (value: boolean) => {
        setEditableScenario({...editableScenario as Scenario, loadToManipulation: value});
    }
    return <div className="scenario-details">
        <ScenarioTitle
            title={scenario.name}
            onChangeTitle={handleChangeTitle}
            editMode={props.editMode}
            onEdit={props.setEditMode}
            onDelete={handleDeleteScenario}
            onSave={handleSaveScenario}
        />
        <ScenarioMetadata editMode={props.editMode} scenario={scenario} setScenario={setEditableScenario}/>
        <ProviderTable
            key={"provider-" + props.editMode.toString()}
            editable={props.editMode}
            providers={scenario.providers}
            editProvider={handleEditProvider}
        />
        <TargetTable
            key={"target-" + props.editMode.toString()}
            loadToManipulation={scenario.loadToManipulation}
            setLoadToManipulation={handleLoadToManipulation}
            editable={props.editMode}
            targets={scenario.targets}
            editTarget={handleEditTarget}
            deleteTarget={handleDeleteTarget}
            addTarget={handleAddTarget}
        />
    </div>
}

export default ScenarioDetails;