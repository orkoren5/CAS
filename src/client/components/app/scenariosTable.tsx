import React, {useState} from "react";
import {Scenario} from "../../../common/types/Scenario";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./scenariosTable.scss";
import Table from "../common/table";
import ScenarioDetails from "./scenarioDetails";

interface ScenariosTableProps {
    scenarios: Record<string, Scenario>;
    onAddScenarioClick: () => void;
}

const scenarioTableColumns = ["name", "description", "lastSaveDate", "lastRunDate", "edit", "delete"];
const scenarioTableHeaders = [["Scenario Name", "Description", "Last Save Date", "Last Run Date", "", ""]];

const ScenariosTable = (props: ScenariosTableProps) => {
    const list = Object.values(props.scenarios);
    const [selected, setSelected] = useState<Scenario>(list[0]);

    const scenarioRows = list.map(scenario => ({
        key: scenario.id,
        name: scenario.name,
        description: scenario.description,
        lastSaveDate: scenario.lastSaveDate.toDateString(),
        lastRunDate: scenario.lastRunDate?.toDateString() || ""
    }))
    return <>
        <div className="scenario-title-bar">
            <Typography color="textPrimary" variant="h6">Scenarios ({ list.length })</Typography>
            <Button variant="contained" color="primary" onClick={props.onAddScenarioClick}>Add new scenario</Button>
        </div>
        <div className="tables-container">
            <div className="scenario-table">
                <Table
                    columns={scenarioTableColumns}
                    headers={scenarioTableHeaders}
                    rows={scenarioRows}
                />
            </div>
            <ScenarioDetails scenario={selected}/>
        </div>

    </>
}

export default ScenariosTable;