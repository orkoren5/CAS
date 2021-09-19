import React, {FC, useState} from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useDispatch} from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import StepOne, {FileStatus} from "./stepOne";
import StepTwo, {ProviderData, Target, StepTwoProps} from "./stepTwo";
import DialogContent from "@material-ui/core/DialogContent";
import Stepper from "../common/stepper";
import {Scenario} from "../../../common/types/Scenario";
import type {NewScenarioDialogProps} from "./newScenarioDialog";
import {makeStyles} from "@material-ui/core/styles";
import fetch from "../../state/mockFetch";

interface ScenarioDialogContentProps {
    onClose: NewScenarioDialogProps["onClose"]
}

const useStyles = makeStyles((theme) => ({
    titleRoot: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    contentRoot: {
        padding: 0,
    },
    actionsRoot: {
        backgroundColor: "#041127",
        flexDirection: "row-reverse",
        justifyContent: "space-between"
    }
}));

const ScenarioDialogContent: FC<ScenarioDialogContentProps> = (props: ScenarioDialogContentProps) => {
    const [activeStep, setActiveStep] = useState<number>(1);
    const [fileStatus, setFileStatus] = useState<FileStatus>(FileStatus.NOT_UPLOADED);
    const [fileName, setFileName] = useState<string>();
    const [providerData, setProviderData] = useState<ProviderData[]>([]);
    const [targets, setTargets] = useState<StepTwoProps["targets"]>([]);
    const [scenario, setScenario] = useState<Partial<Scenario>>();

    const classes = useStyles();
    const dispatch = useDispatch();

    const steps = [
        {label: "Scenario details"},
        {label: "Providers & targets"}
    ];

    const handlePositiveClick = () => {
        activeStep < 1 ? handleNext() : createScenario();
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const createScenario = () => {
        props.onClose();
    };

    const handleFileRemoved = () => {
        setFileStatus(FileStatus.NOT_UPLOADED);
        setFileName(undefined);
    }

    const handleFileSelected = async (file : File) => {
        setFileStatus(FileStatus.UPLOADING);
        setFileName(file.name);

        const formData = new FormData();
        formData.append("csv", file || "");

        const response = await fetch("/uploadCSV", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: formData
        });

        setProviderData(response);
        setFileStatus((currStatus) => {
            if (currStatus === FileStatus.UPLOADING) {
                return FileStatus.UPLOADED;
            }
            return currStatus;
        });
    }

    const handleAddTarget = () => {
        const newTarget: Target & { key: string } = {
            key: new Date().getTime().toString(),
            name: "",
            provider: "",
            imei: 0,
            imsi: 0
        };

        setTargets([...targets, newTarget]);
    }

    return <>
        <DialogTitle color="secondary" classes={{root: classes.titleRoot}} disableTypography>
            <span>Add New Scenario</span>
            <IconButton onClick={props.onClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent classes={{root: classes.contentRoot}}>
            <Stepper activeStep={activeStep} steps={steps}/>
            { activeStep === 0 &&
                <StepOne
                    onFileSelected={handleFileSelected}
                    onRemoveFile={handleFileRemoved}
                    fileStatus={fileStatus}
                    fileName={fileName as string}
                />
            }
            { activeStep === 1 &&
                <StepTwo
                    targets={targets}
                    providerData={providerData}
                    addTarget={handleAddTarget}
                />
            }
        </DialogContent>
        <DialogActions classes={{ root: classes.actionsRoot }} color="primary">
            <Button disabled={fileStatus !== FileStatus.UPLOADED} variant="contained" color="primary" onClick={handlePositiveClick}>
                { activeStep === 1 ? "Generate Scenario" : "Next" }
            </Button>
            { activeStep > 0 &&
                <Button variant="outlined" onClick={handleBack}>
                    Back
                </Button>
            }
        </DialogActions>
    </>
};

export default ScenarioDialogContent;