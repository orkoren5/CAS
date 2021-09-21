import React, {useState} from "react";
import {Scenario} from "../../../common/types/Scenario";
import ScenarioTitle from "./scenarioTitle";
import TextField from "../common/textField";
import InputAdornment from "@material-ui/core/InputAdornment";
import {TextFieldProps} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

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

    return <div className="scenario-details">
        <ScenarioTitle
            title={scenario.name}
            editMode={editMode}
            onEdit={setEditMode}
            onDelete={() => {}}
            onSave={() => {}}
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

    </div>
}

export default ScenarioDetails;