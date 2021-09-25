import React from 'react';
import '../App.css';
import './runScenario.scss';

import AppHeader from "../components/common/appHeader";
import {useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StatusTile from "../components/runScenario/statusTile";
//@ts-ignore
import StatusIcon from "../assets/icons/icon-status.svg";
//@ts-ignore
import StartTimeIcon from "../assets/icons/icon-start-time.svg";
//@ts-ignore
import DurationIcon from "../assets/icons/icon-duration.svg";
import ScenarioDetails from "../components/app/scenarioDetails";
import {useSelector} from "react-redux";
import {getScenarioById} from "../state/selectors";
import ScenarioMetadata from "../components/app/scenarioMetadata";
import ProviderTable from "../components/app/providerTable";
import TargetTable from "../components/app/targetTable";

function RunScenario() {
    let { scenarioId } = useParams<{scenarioId: string}>();
    const scenario = useSelector(getScenarioById(scenarioId));

    return (
        <div className="App">
            <AppHeader title="CAS Manipulation Subsystem Simulator- Trainer App"/>
            <div className="tables-container">
                <div className="run-scenario">
                    <div className="run-scenario-title">
                        <Typography variant="h5" color="textPrimary">Scenario</Typography>
                        <Button variant="contained" color="primary">End run</Button>
                    </div>
                    <div className="run-scenario-status">
                        <StatusTile title="Status" value="Running" subtitle="" status="running" icon={<StatusIcon/>}/>
                        <StatusTile title="Start run time" value="13:32" subtitle="15.06.21" status="regular" icon={<StartTimeIcon/>}/>
                        <StatusTile title="Status" value="Running" subtitle="" status="regular" icon={<DurationIcon/>}/>
                    </div>
                    <div className="run-scenario-details">
                        <ScenarioMetadata editMode={false} scenario={scenario} setScenario={() => {}}/>
                        <ProviderTable
                            editable={false}
                            providers={scenario.providers}
                            editProvider={() => {}}
                        />
                        <TargetTable
                            editable={false}
                            targets={scenario.targets}
                            editTarget={() => {}}
                            deleteTarget={() => {}}
                            addTarget={() => {}}
                        />
                    </div>
                </div>
                <div className="tables-container">
                    <div className="run-scenario-title">
                        <Typography variant="h5" color="textPrimary">Stations</Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RunScenario;
