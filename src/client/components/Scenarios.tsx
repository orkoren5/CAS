import React, {useState} from 'react';
import '../App.css';
import {Button, Typography} from "@material-ui/core";
import NewScenarioDialog from "./ScenarioDialog/newScenarioDialog";

function Scenarios() {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="App">
            <Typography color="textPrimary">There are no scenarios yet</Typography>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add new scenario</Button>
            <NewScenarioDialog onClose={() => setOpen(false)} open={open}/>
        </div>
    );
}

export default Scenarios;
