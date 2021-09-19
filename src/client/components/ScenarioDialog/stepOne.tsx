import React, {FC, useState} from "react";
import TextField from "../common/textField";
import Dropzone from "../common/dropzone";
import {useDispatch} from "react-redux";
import Cancel from "@material-ui/icons/Cancel";
import Delete from "@material-ui/icons/Delete";
import {LinearProgress} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

export enum FileStatus {
    NOT_UPLOADED,
    UPLOADING,
    UPLOADED
}

interface StepOneProps {
    onFileSelected: (file: File) => void;
    onRemoveFile: () => void;
    fileStatus: FileStatus;
    fileName: string;
}

const StepOne: FC<StepOneProps> = (props: StepOneProps) => {
    const dispatch = useDispatch();

    const handleFileSelected = (files: File[]) => {
        props.onFileSelected(files[0]);
    }

    return <div className="step-one">
        <TextField
            fullWidth
            label="Scenario Name"
        />
        <TextField
            multiline
            fullWidth
            rows={2}
            label="Description"
        />
        <div className="last-row">
            <div className="long-lat">
                <span className="scenario-dialog__title">Scenario Name</span>
                <div className="last-row-content">
                    <span className="scenario-dialog__title">Lat:</span>
                    <TextField/>
                    <span className="scenario-dialog__title lon">Lon:</span>
                    <TextField/>
                </div>
            </div>
            <div>
                <span className="scenario-dialog__title">Shelter radius</span>
                <div className="last-row-content">
                    <TextField/>
                    <span className="scenario-dialog__title">km</span>
                </div>
            </div>
        </div>
        <span className="scenario-dialog__title upload-title">Upload scan file</span>
        <Dropzone onFilesLoaded={handleFileSelected}/>
        { props.fileStatus !== FileStatus.NOT_UPLOADED &&
            <>
                <div className="progress-row">
                    <span>{props.fileName}</span>
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