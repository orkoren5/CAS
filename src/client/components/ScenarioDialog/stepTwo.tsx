import React, {FC} from "react";
import {styled} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import cx from "classNames";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import type {Provider} from "../../../common/types/Provider";
import type {Target} from "../../../common/types/Target";
import TargetTable from "../app/targetTable";
import ProviderTable from "../app/providerTable";

export interface StepTwoProps {
    providers: Provider[];
    targets: Target[],
    addTarget: () => void;
    deleteTarget: (id: string) => void;
    editTarget: (target: Target) => void;
}

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#172A42",
    fontSize: 12,
    maxWidth: 100
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    fontStyle: "italic",
    color: "#5e7a9b",
    fontSize: "12px !important"
}));

const StepTwo: FC<StepTwoProps> = (props: StepTwoProps) => {
    return <div className="step-two">
        <ProviderTable providers={props.providers} editProvider={() => {}}/>
        <div>
            <div className={cx("targets-title-bar", {"no-targets": props.targets.length === 0})}>
                <span className="provider-title scenario-dialog__title">Targets ({props.targets.length})</span>
                <div>
                    { props.targets.length > 0 &&
                        <StyledFormControlLabel
                            label="Load to manipulation"
                            control={
                                <Checkbox color="default"/>
                            }
                        />
                    }
                    <StyledButton onClick={props.addTarget} size="small" variant="outlined">Add Target</StyledButton>
                </div>
            </div>
            { props.targets.length > 0 &&
                <TargetTable targets={props.targets} editTarget={props.editTarget} deleteTarget={props.deleteTarget}/>
            }
        </div>
    </div>
};

export default StepTwo;