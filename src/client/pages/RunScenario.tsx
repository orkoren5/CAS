import React from 'react';
import '../App.css';
import './runScenario.scss';
import AppHeader from "../components/common/appHeader";
import {useHistory, useParams} from "react-router-dom";
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
import dateformat from "dateformat";

const NUM_COLS = 2;

function RunScenario() {
    let { scenarioId } = useParams<{scenarioId: string}>();
    const scenario = useSelector(getScenarioById(scenarioId));
    const runStatus = useSelector(getRunStatus(scenarioId));
    const dispatch = useDispatch();
    const history = useHistory();

    const handleEndRun = () => {
        dispatch(stopScenario(scenarioId));
        history.push("/scenarios/" + scenario.id);
    };

    const startRunTime = scenario.lastRunDate ? dateformat(scenario.lastRunDate, "hh:MM") : "";
    const startRunDate = scenario.lastRunDate ? dateformat(scenario.lastRunDate, "dd.mm.yy") : "";

    const createStationsCol = (colNum: number) => {
        const stations = [];
        for (let index = colNum; index < runStatus.stations.length; index += NUM_COLS) {
            const station = runStatus.stations[index];
            stations.push(<Station
                key={index}
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
        return <div className="stations-column">{stations}</div>
    }

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
                            onClick={handleEndRun}
                        >
                            End Run
                        </Button>
                    </div>
                    <div className="run-scenario-status">
                        <StatusTile fixPos={false} title="Status" value={runStatus.status === "running" ? "Running" : "Stopped"} subtitle="" status={runStatus.status} icon={<StatusIcon/>}/>
                        <StatusTile
                            fixPos={true}
                            title="Start run time"
                            value={startRunTime}
                            subtitle={startRunDate}
                            status="regular" icon={<StartTimeIcon/>}
                        />
                        <StatusTile fixPos={true} title="Duration" value={scenario.lastRunDate || ""} subtitle="" status="regular" icon={<DurationIcon/>}/>
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
                            loadToManipulation={scenario.loadToManipulation}
                            setLoadToManipulation={() => {}}
                            targets={scenario.targets}
                            editTarget={() => {}}
                            deleteTarget={() => {}}
                            addTarget={() => {}}
                        />
                    </div>
                </div>
                <div className="stations-container">
                    <Typography className="stations-title" variant="h5" color="textPrimary">Stations</Typography>
                    {createStationsCol(0)}
                    {createStationsCol(1)}
                </div>
            </div>
        </div>
    );
}

export default RunScenario;
