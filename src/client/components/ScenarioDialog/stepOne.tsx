import React, {FC} from "react";
import TextField from "../common/textField";
import Dropzone from "../common/dropzone";
import Cancel from "@material-ui/icons/Cancel";
import Delete from "@material-ui/icons/Delete";
import {LinearProgress, TextFieldProps} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import {Scenario} from "../../../common/types/Scenario";

export enum FileStatus {
    NOT_UPLOADED,
    UPLOADING,
    UPLOADED
}

interface StepOneProps {
    onFileSelected: (file: File) => void;
    onRemoveFile: () => void;
    onEditScenario: (scenario: Partial<Scenario>) => void;
    scenario: Partial<Scenario>;
    fileStatus: FileStatus;
    fileName: string;
}

type ScenarioTextFieldProps = { scenario: Partial<Scenario>, fieldName: keyof Scenario, editScenario: StepOneProps["onEditScenario"] };
const ScenarioTextField = (props: TextFieldProps & ScenarioTextFieldProps) => {
    const { scenario, fieldName, editScenario, ...textFieldProps } = props;
    return <TextField
        {...textFieldProps}
        onBlur={(e) => {
            const newScenario = { ...scenario, [fieldName]: e.target.value }
            editScenario(newScenario);
        }}
        fullWidth
        defaultValue={scenario[fieldName]}
    />;
}

const StepOne: FC<StepOneProps> = (props: StepOneProps) => {
    const handleFileSelected = (files: File[]) => {
        props.onFileSelected(files[0]);
    }

    return <div className="step-one">
        <ScenarioTextField
            scenario={props.scenario}
            editScenario={props.onEditScenario}
            fieldName="name"
            label="Scenario Name"
        />
        <ScenarioTextField
            multiline
            rows={2}
            scenario={props.scenario}
            editScenario={props.onEditScenario}
            fieldName="description"
            label="Description"
        />
        <div className="last-row">
            <div className="long-lat">
                <span className="scenario-dialog__title">Scenario Name</span>
                <div className="last-row-content">
                    <span className="scenario-dialog__title">Lat:</span>
                    <ScenarioTextField
                        scenario={props.scenario}
                        editScenario={props.onEditScenario}
                        fieldName="lat"
                    />
                    <span className="scenario-dialog__title lon">Lon:</span>
                    <ScenarioTextField
                        scenario={props.scenario}
                        editScenario={props.onEditScenario}
                        fieldName="long"
                    />
                </div>
            </div>
            <div>
                <span className="scenario-dialog__title">Shelter radius</span>
                <div className="last-row-content">
                    <ScenarioTextField
                        scenario={props.scenario}
                        editScenario={props.onEditScenario}
                        fieldName="km"
                    />
                    <span className="scenario-dialog__title">km</span>
                </div>
            </div>
        </div>
        <span className="scenario-dialog__title upload-title">Upload scan file</span>
        <Dropzone onFilesLoaded={handleFileSelected}/>
        { props.fileStatus !== FileStatus.NOT_UPLOADED &&
            <>
                <div className="progress-row">
                    <div className="progress-file-name">
                        <InsertDriveFile/>
                        <span>{props.fileName}</span>
                    </div>
                    {
                        props.fileStatus === FileStatus.UPLOADING ?
                            <IconButton onClick={props.onRemoveFile}><Cancel/></IconButton> :
                            <IconButton onClick={props.onRemoveFile}><Delete/></IconButton>
                    }
                </div>
                <LinearProgress
                    classes={{ barColorPrimary: "progress-bar" }}
                    variant={props.fileStatus === FileStatus.UPLOADING ? "indeterminate" : "determinate"}
                    value={100}
                />
            </>
        }
    </div>
};

export default StepOne;