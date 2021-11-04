import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import dataReducer, {MainState} from "./state/reducer";
import confReducer, {ConfState} from "./state/configuration/reducer";
import filterReducer, {FilterState} from "./state/filter/reducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export interface GlobalState {
    data: MainState;
    configuration: ConfState;
    filter: FilterState;
}


const rootReducer = combineReducers({
    data: dataReducer,
    configuration: confReducer,
    filter: filterReducer
});

export type GlobalReducer = typeof rootReducer;

let store = createStore(rootReducer, composedEnhancer);

export { store }