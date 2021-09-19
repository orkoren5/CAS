import {AnyAction} from "redux";
import {Scenario} from "../../common/types/Scenario";

export interface MainState {
    scenarios: Record<string, Scenario>
}

const initialState: MainState = {
    scenarios: {}
}

function reducer(state = initialState, action: AnyAction) {
    switch (action.type) {
        default:
            return state;
    }
}

export default reducer;