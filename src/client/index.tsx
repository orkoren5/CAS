import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import { ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import {store} from "./store";
import Scenarios from "./components/Scenarios";
import muiTheme from "./muiTheme";

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <Switch>
                    <Route path="/scenarios" render={(props: any) => <Scenarios {...props} />} />
                    <Redirect to="/scenarios" />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);
