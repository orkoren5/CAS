import React, {FC} from "react";
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

const StepTwo: FC<StepTwoProps> = (props: StepTwoProps) => {
    return <div className="step-two">
        <ProviderTable editable providers={props.providers} editProvider={() => {}}/>
        <TargetTable
            editable
            targets={props.targets}
            editTarget={props.editTarget}
            deleteTarget={props.deleteTarget}
            addTarget={props.addTarget}
        />
    </div>
};

export default StepTwo;