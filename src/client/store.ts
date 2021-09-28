import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import dataReducer, {MainState} from "./state/reducer";
import confReducer, {ConfState} from "./state/configuration/reducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export interface GlobalState {
    data: MainState;
    configuration: ConfState;
}


const rootReducer = combineReducers({
    data: dataReducer,
    configuration: confReducer
});

let store = createStore(rootReducer, composedEnhancer);

export { store }