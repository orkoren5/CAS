import Dialog, {DialogProps} from "@material-ui/core/Dialog";
import React from "react";
import ScenarioDialogContent from "./newScenarioDialogContent";
import "./styles.scss";

export interface NewScenarioDialogProps extends DialogProps {
    onClose: () => void;
}

const NewScenarioDialog = (props: NewScenarioDialogProps) => {
    return <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth
        maxWidth="md"
        PaperProps={{className: "scenario-dialog"}}
    >
        <ScenarioDialogContent onClose={props.onClose} />
    </Dialog>
}

export default NewScenarioDialog;