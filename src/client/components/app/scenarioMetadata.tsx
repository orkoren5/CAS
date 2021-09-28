import React from "react";
import "./scenarioMetadata.scss";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "../common/textField";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Scenario} from "../../../common/types/Scenario";
import {TextFieldProps} from "@material-ui/core";

type ScenarioTextFieldProps = { scenario: Scenario, fieldName: keyof Scenario, editScenario: (scenario: Scenario) => void };
const ScenarioTextField = (props: TextFieldProps & ScenarioTextFieldProps) => {
    const { scenario, fieldName, editScenario, ...textFieldProps } = props;
    return <TextField
        onBlur={(e) => {
            const newScenario = { ...scenario, [fieldName]: e.target.value }
            editScenario(newScenario);
        }}
        fullWidth
        defaultValue={scenario[fieldName]}
        {...textFieldProps}
    />;
}

interface ScenarioMetadataProps {
    editMode: boolean;
    scenario: Scenario;
    setScenario: (scenario: Scenario) => void;
}

const ScenarioMetadata = ({ editMode, scenario, setScenario }: ScenarioMetadataProps) => {
    return <div className="scenario-metadata">
        <ScenarioTextField
            className="scenario-description"
            label="Description"
            fieldName="description"
            disabled={!editMode}
            scenario={scenario}
            editScenario={setScenario}
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
                editScenario={setScenario}
                fieldName="lat"
            />
            <Typography color="textPrimary">Lon:</Typography>
            <ScenarioTextField
                disabled={!editMode}
                scenario={scenario}
                editScenario={setScenario}
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
}

export default ScenarioMetadata;