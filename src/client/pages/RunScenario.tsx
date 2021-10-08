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
import {useDispatch, useSelector} from "react-redux";
import {getRunStatus, getScenarioById} from "../state/selectors";
import ScenarioMetadata from "../components/app/scenarioMetadata";
import ProviderTable from "../components/app/providerTable";
import TargetTable from "../components/app/targetTable";
import Station from "../components/runScenario/station";
import {changeBTSStatus, changePAStatus, changeScannerStatus, changeStationMode, stopScenario} from "../state/actions";
import {runScenario} from "../state/thunkActionCreators";

function RunScenario() {
    let { scenarioId } = useParams<{scenarioId: string}>();
    const scenario = useSelector(getScenarioById(scenarioId));
    const runStatus = useSelector(getRunStatus(scenarioId));
    const dispatch = useDispatch();

    const handleToggleRun = () => {
        runStatus.status === "running" ? dispatch(stopScenario(scenarioId)) : dispatch(runScenario(scenarioId));
    };

    const startRunTime = scenario.lastRunDate?.toLocaleTimeString() || "";
    const startRunDate = scenario.lastRunDate?.toLocaleDateString() || "";

    return (
        <div className="App">
            <AppHeader title="Manipulation Subsystem Simulator- Trainer App"/>
            <div className="tables-container">
                <div className="run-scenario">
                    <div className="run-scenario-title">
                        <Typography variant="h5" color="textPrimary">Scenario</Typography>
                        <Button
                            className="run-scenario-button"
                            variant="contained"
                            color="primary"
                            onClick={handleToggleRun}
                        >
                            {runStatus.status === "running" ? "End run" : "Start run"}
                        </Button>
                    </div>
                    <div className="run-scenario-status">
                        <StatusTile title="Status" value={runStatus.status === "running" ? "Running" : "Stopped"} subtitle="" status={runStatus.status} icon={<StatusIcon/>}/>
                        <StatusTile
                            title="Start run time"
                            value={startRunTime}
                            subtitle={startRunDate}
                            status="regular" icon={<StartTimeIcon/>}
                        />
                        <StatusTile title="Duration" value={scenario.lastRunDate || ""} subtitle="" status="regular" icon={<DurationIcon/>}/>
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
                <div className="stations-container">
                    <Typography className="stations-title" variant="h5" color="textPrimary">Stations</Typography>
                    <div className="stations-grid">
                        {
                            runStatus.stations.map((station, index) => <Station
                                title={"Station " + (index + 1)}
                                systemMode={station.mode}
                                btsStatuses={station.btsStatuses}
                                paStatus={station.paStatuses}
                                scanner={station.scannerStatuses[0]}
                                onChangeBTSStatus={(ok: boolean, statusIndex: number) => dispatch(changeBTSStatus(scenarioId, index, statusIndex, ok))}
                                onChangePAStatus={(ok: boolean, statusIndex: number) => dispatch(changePAStatus(scenarioId, index, statusIndex, ok))}
                                onChangeScannerStatus={(ok: boolean) => dispatch(changeScannerStatus(scenarioId, index, ok))}
                                onChangeMode={(systemMode => dispatch(changeStationMode(scenarioId, index, systemMode)))}
                            />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RunScenario;
