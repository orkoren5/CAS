import {GlobalState} from "../../store";
import {ConfState} from "./reducer";

export const getConfiguration = (confName: keyof ConfState) => (state: GlobalState) => state.configuration[confName];