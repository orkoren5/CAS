import {ThunkAction} from "redux-thunk";
import {GlobalState} from "../store";
import {AnyAction} from "redux";
import fetch from "./mockFetch";

type ThunkActionCreator = (...args: any) => ThunkAction<void, GlobalState, any, AnyAction>;

export const uploadCSV: ThunkActionCreator = (file: File) => async (dispatch, getState) => {
    const formData = new FormData();
    formData.append("csv", file || "");

    const response = await fetch("/uploadCSV", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: formData
    });

    if (response.status === 200 || response.status === 204) {

    }
}