import {Selector} from "reselect";
import type {GlobalState} from "../store";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkActionCreator} from "../state/thunkActionCreators";

const itemUnfetched = (item: any) => {
    return item === null || item === undefined;
}

const usePrefetch = (selectors: Selector<GlobalState, any>[], fetchActions: ThunkActionCreator[]) => {
    const items = selectors.map(selector => useSelector(selector));
    const dispatch = useDispatch();

    useEffect(() => {
        items.forEach((item, index) => {
            if (itemUnfetched(item)) {
                dispatch(fetchActions[index]())
            }
        })
    }, []);

    return items.some(item => itemUnfetched(item));
}

export default usePrefetch;