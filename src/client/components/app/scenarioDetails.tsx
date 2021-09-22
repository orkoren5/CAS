import React, {useState} from "react";
import {Scenario} from "../../../common/types/Scenario";
import ScenarioTitle from "./scenarioTitle";
import TextField from "../common/textField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {TextFieldProps} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ProviderTable from "./providerTable";
import TargetTable from "./targetTable";
import {useDispatch} from "react-redux";
import {Provider} from "../../../common/types/Provider";
import {Target} from "../../../common/types/Target";
import {addScenario, deleteScenario, editScenario} from "../../state/thunkActionCreators";
import Button from "@material-ui/core/Button";

type ScenarioTextFieldProps = { scenario: Scenario, fieldName: keyof Scenario, editScenario: (scenario: Scenario) => void };
const ScenarioTextField = (props: TextFieldProps & ScenarioTextFieldProps) => {
    return <TextField
        onBlur={(e) => {
            const newScenario = { ...props.scenario, [props.fieldName]: e.target.value }
            props.editScenario(newScenario);
        }}
        fullWidth
        defaultValue={props.scenario[props.fieldName]}
        {...props}
    />;
}

interface ScenarioDetailsProps {
    scenario: Scenario;
}

const ScenarioDetails = (props: ScenarioDetailsProps) => {
    const [editableScenario, setEditableScenario] = useState<Scenario | null>(null);
    const editMode = editableScenario !== null;
    const setEditMode = (editMode: boolean) => setEditableScenario(editMode ? props.scenario : null);
    const scenario = editableScenario || props.scenario;
    const dispatch = useDispatch();

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

    return <div className="scenario-details">
        <ScenarioTitle
            title={scenario.name}
            onChangeTitle={handleChangeTitle}
            editMode={editMode}
            onEdit={setEditMode}
            onDelete={handleDeleteScenario}
            onSave={handleSaveScenario}
        />
        <div className="scenario-details-grid">
            <ScenarioTextField
                className="scenario-description"
                label="Description"
                fieldName="description"
                disabled={!editMode}
                scenario={scenario}
                editScenario={setEditableScenario}
            />
            <TextField
                label="Creation date"
                disabled
                defaultValue={scenario.creationDate.toDateString()}
            />
            <TextField
                label="Last save date"
                fullWidth
                disabled
                defaultValue={scenario.lastSaveDate.toDateString()}
            />
            <TextField
                label="Last save date"
                fullWidth
                disabled
                defaultValue={scenario.lastRunDate?.toDateString()}
            />
            <div className="scenario-location">
                <Typography className="scenario-location-title" color="textPrimary">Shelter Location</Typography>
                <Typography color="textPrimary">Lat:</Typography>
                <ScenarioTextField
                    disabled={!editMode}
                    scenario={scenario}
                    editScenario={setEditableScenario}
                    fieldName="lat"
                />
                <Typography color="textPrimary">Lon:</Typography>
                <ScenarioTextField
                    disabled={!editMode}
                    scenario={scenario}
                    editScenario={setEditableScenario}
                    fieldName="long"
                />
            </div>
            <TextField
                label="Shelter Radius"
                fullWidth
                disabled={!editMode}
                InputProps={{
                    endAdornment: editMode ? <InputAdornment position="end">km</InputAdornment>: undefined
                }}
                value={editMode ? scenario.km : scenario.km + "km"}
            />
        </div>
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
            <Button disabled={editMode} variant="contained" color="primary">Run scenario</Button>
        </div>
    </div>
}

export default ScenarioDetails;