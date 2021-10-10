import React from "react";
import Dialog, {DialogProps} from "@material-ui/core/Dialog";
import {makeStyles} from "@material-ui/core/styles";
import {Technology} from "../../../common/types/Provider";
import BtsListDialogContent from "./btsListDialogContent";

export interface BTSListDialogProps extends DialogProps {
    onClose: () => void;
    provider: string;
    technology?: Technology
}

const BTSListDialog = (props: BTSListDialogProps) => {
    const {provider, onClose, technology, ...dialogProps} = props;
    return <Dialog
        onClose={props.onClose}
        fullWidth
        maxWidth="sm"
        {...dialogProps}
    >
        <BtsListDialogContent provider={provider} onClose={onClose} technology={technology}/>
    </Dialog>
}

export default BTSListDialog;