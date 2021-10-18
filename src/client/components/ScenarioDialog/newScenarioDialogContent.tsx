import React, {FC, useState} from "react";
import {useDispatch} from 'react-redux';
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button";
import StepOne, {FileStatus} from "./stepOne";
import StepTwo from "./stepTwo";
import DialogContent from "@material-ui/core/DialogContent";
import Stepper from "../common/stepper";
import {makeStyles} from "@material-ui/core/styles";
import fetch from "../../state/mockFetch";
import {addScenario} from "../../state/thunkActionCreators";
import type {Scenario} from "../../../common/types/Scenario";
import type {Provider, Technology} from "../../../common/types/Provider";
import type {NewScenarioDialogProps} from "./newScenarioDialog";
import type {Target} from "../../../common/types/Target";
import DialogTitle from "../common/dialogTitle";
import BtsListDialogContent from "../app/btsListDialogContent";

interface ScenarioDialogContentProps {
    onClose: NewScenarioDialogProps["onClose"]
}

const useStyles = makeStyles((theme) => ({
    titleRoot: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "11px 20px"
    },
    contentRoot: {
        padding: 0,
    },
    actionsRoot: {
        backgroundColor: "#041127",
        flexDirection: "row-reverse",
        justifyContent: "space-between",
    },
    actionBtn: {
        minWidth: 180
    }
}));

const ScenarioDialogContent: FC<ScenarioDialogContentProps> = (props: ScenarioDialogContentProps) => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [showBtsList, setShowBtsList] = useState<{ provider: string, technology?: Technology } | null>(null);
    const [fileStatus, setFileStatus] = useState<FileStatus>(FileStatus.NOT_UPLOADED);
    const [fileName, setFileName] = useState<string>();
    const [providers, setProviders] = useState<Provider[]>([]);
    const [targets, setTargets] = useState<Target[]>([]);
    const [scenario, setScenario] = useState<Partial<Scenario>>({});
    const [loadToManipulation, setLoadToManipulation] = useState<boolean>(false);

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
        dispatch(addScenario({
            ...scenario,
            loadToManipulation,
            targets,
            providers
        }));
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

        const response = await fetch<Provider[]>("/uploadCSV", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            body: formData
        });

        const providers = await response.json();

        setProviders(providers);
        setFileStatus((currStatus) => {
            if (currStatus === FileStatus.UPLOADING) {
                return FileStatus.UPLOADED;
            }
            return currStatus;
        });
    }

    const handleAddTarget = () => {
        const newTarget: Target = {
            id: new Date().getTime().toString(),
            name: "",
            provider: "",
            imei: 0,
            imsi: 0
        };

        setTargets([newTarget, ...targets]);
    }

    const handleEditScenario = (scenario: Partial<Scenario>) => {
        setScenario(scenario);
    }

    const handleDeleteTarget = (id: string) => {
        const targetIndex = targets.findIndex(target => target.id === id);
        const newTargets = [...targets.slice(0, targetIndex), ...targets.slice(targetIndex + 1)];
        setTargets(newTargets);
    }

    const handleEditTarget = (target: Target) => {
        const targetIndex = targets.findIndex(t => t.id === target.id);
        const newTargets = [...targets];
        newTargets[targetIndex] = target;
        setTargets(newTargets);
    }

    const handleEditProvider = (provider: Provider) => {
        const providerIndex = providers.findIndex(p => p.provider === provider.provider);
        const newProvider = [...providers];
        newProvider[providerIndex] = provider;
        setProviders(newProvider);
    }

    if (showBtsList) {
        return <>
            <BtsListDialogContent provider={showBtsList.provider} technology={showBtsList.technology} onClose={props.onClose}/>
            <DialogActions classes={{ root: classes.actionsRoot }} color="primary">
                <div/>
                <Button classes={{ root: classes.actionBtn}} variant="outlined" onClick={() => setShowBtsList(null)}>
                    Back
                </Button>
            </DialogActions>
        </>
    }
    else {
        return <>
            <DialogTitle title="Add New Scenario" onClose={props.onClose}/>
            <DialogContent classes={{root: classes.contentRoot}}>
                <Stepper activeStep={activeStep} steps={steps}/>
                {activeStep === 0 &&
                <StepOne
                    onFileSelected={handleFileSelected}
                    onRemoveFile={handleFileRemoved}
                    onEditScenario={handleEditScenario}
                    scenario={scenario}
                    fileStatus={fileStatus}
                    fileName={fileName as string}
                />
                }
                {activeStep === 1 &&
                <StepTwo
                    targets={targets}
                    providers={providers}
                    addTarget={handleAddTarget}
                    deleteTarget={handleDeleteTarget}
                    editTarget={handleEditTarget}
                    editProvider={handleEditProvider}
                    setLoadToManipulation={setLoadToManipulation}
                    loadToManipulation={loadToManipulation}
                    showBtsList={(provider, technology) => setShowBtsList({provider, technology})}
                />
                }
            </DialogContent>
            <DialogActions classes={{ root: classes.actionsRoot }} color="primary">
                <Button disabled={fileStatus !== FileStatus.UPLOADED} classes={{ root: classes.actionBtn}} variant="contained" color="primary" onClick={handlePositiveClick}>
                    { activeStep === 1 ? "Generate Scenario" : "Next" }
                </Button>
                { activeStep > 0 &&
                <Button classes={{ root: classes.actionBtn}} variant="outlined" onClick={handleBack}>
                    Back
                </Button>
                }
            </DialogActions>
        </>
    }
};

export default ScenarioDialogContent;