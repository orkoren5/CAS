import React, {FC} from "react";
import type {Provider, Technology} from "../../../common/types/Provider";
import type {Target} from "../../../common/types/Target";
import TargetTable from "../app/targetTable";
import ProviderTable from "../app/providerTable";

export interface StepTwoProps {
    providers: Provider[];
    editProvider: (provider: Provider) => void;
    targets: Target[],
    addTarget: () => void;
    deleteTarget: (id: string) => void;
    editTarget: (target: Target) => void;
    loadToManipulation: boolean;
    setLoadToManipulation: (value: boolean) => void;
    showBtsList: (provider: string, technology?: Technology) => void;
}

const StepTwo: FC<StepTwoProps> = (props: StepTwoProps) => {
    return <div className="step-two">
        <ProviderTable editable providers={props.providers} editProvider={props.editProvider} onShowBtsList={props.showBtsList}/>
        <TargetTable
            editable
            loadToManipulation={props.loadToManipulation}
            setLoadToManipulation={props.setLoadToManipulation}
            targets={props.targets}
            editTarget={props.editTarget}
            deleteTarget={props.deleteTarget}
            addTarget={props.addTarget}
        />
    </div>
};

export default StepTwo;