import React, {useState} from 'react';
import '../App.css';
import NewScenarioDialog from "../components/ScenarioDialog/newScenarioDialog";
import AppHeader from "../components/common/appHeader";
import NoScenarios from "../components/app/noScenarios";
import {useSelector} from "react-redux";
import {getScenarios} from "../state/selectors";
import ScenariosPage from "../components/app/scenariosPage";
import usePrefetch from "../hooks/usePrefetch";
import {fetchScenarios} from "../state/thunkActionCreators";

function Scenarios() {
    const [open, setOpen] = useState<boolean>(false);
    const scenarios = useSelector(getScenarios);
    const noScenarios = !scenarios || Object.keys(scenarios).length === 0;

    const loading = usePrefetch([getScenarios], [fetchScenarios]);
    if (loading) {
        return null;
    }

    return (
        <div className="App">
            <AppHeader title="Manipulation Subsystem Simulator- Trainer App"/>
            { noScenarios &&
                <NoScenarios onAddScenarioClick={() => setOpen(true)}/>
            }
            { !noScenarios &&
                <ScenariosPage onAddScenarioClick={() => setOpen(true)}/>
            }
            <NewScenarioDialog onClose={() => setOpen(false)} open={open}/>
        </div>
    );
}

export default Scenarios;
