import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import dataReducer, {MainState} from "./state/reducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export interface GlobalState {
    data: MainState;
}


const rootReducer = combineReducers({
    data: dataReducer
});

let store = createStore(rootReducer, composedEnhancer);

export { store }