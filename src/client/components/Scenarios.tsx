import React, {useState} from 'react';
import '../App.css';
import NewScenarioDialog from "./ScenarioDialog/newScenarioDialog";
import AppHeader from "./common/appHeader";
import NoScenarios from "./app/noScenarios";
import {useSelector} from "react-redux";
import {getScenarios} from "../state/selectors";
import ScenariosTable from "./app/scenariosTable";

function Scenarios() {
    const [open, setOpen] = useState<boolean>(false);
    const scenarios = useSelector(getScenarios);
    const noScenarios = Object.keys(scenarios).length === 0;
    return (
        <div className="App">
            <AppHeader title="CAS Manipulation Subsystem Simulator- Trainer App"/>
            { noScenarios &&
                <NoScenarios onAddScenarioClick={() => setOpen(true)}/>
            }
            { !noScenarios &&
                <ScenariosTable onAddScenarioClick={() => setOpen(true)} scenarios={scenarios}/>
            }
            <NewScenarioDialog onClose={() => setOpen(false)} open={open}/>
        </div>
    );
}

export default Scenarios;
