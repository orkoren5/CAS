import {useDispatch, useSelector} from "react-redux";
import {getConfiguration} from "./selectors";
import {ConfState} from "./reducer";
import {useEffect} from "react";
import {setConfig} from "./actions";

export const useGetConfig = (jsonName: keyof ConfState) => {
    const conf = useSelector(getConfiguration(jsonName));
    const dispatch = useDispatch();

    useEffect(() => {
        if (!conf) {
            fetch("/configuration/" + jsonName + ".json").then(res => res.json()).then(config => {
                dispatch(setConfig(jsonName, config))
            });
        }
    }, [conf])

    return conf
}