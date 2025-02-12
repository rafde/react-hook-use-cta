import $18361302265c0809$export$2e2bcd8739ae039 from "./createCTABase.0aa31197.js";
import {strictDeepEqual as $kYwPG$strictDeepEqual} from "fast-equals";
import {useMemo as $kYwPG$useMemo, useRef as $kYwPG$useRef, useCallback as $kYwPG$useCallback, useSyncExternalStore as $kYwPG$useSyncExternalStore} from "react";




function $227a13be7aff0c6a$export$32d3704051e6d520(props, createFunc = ()=>({})) {
    const ctaReducerResults = (0, $18361302265c0809$export$2e2bcd8739ae039)({
        ...props,
        onStateChange: (newHistory)=>{
            history = newHistory;
            snapshot = {
                ...newHistory,
                dispatch: dispatch
            };
            listeners.forEach((listener)=>listener(snapshot));
        }
    }, createFunc);
    let { history: history } = ctaReducerResults;
    const { dispatch: dispatch } = ctaReducerResults;
    const initialSnapshot = {
        ...history,
        dispatch: dispatch
    };
    let snapshot = initialSnapshot;
    function getHistory() {
        return dispatch.history;
    }
    const listeners = new Set();
    function subscribe(listener) {
        listeners.add(listener);
        return ()=>{
            listeners.delete(listener);
        };
    }
    const defaultSelector = ({ dispatch: dispatch, ...history })=>[
            history,
            dispatch
        ];
    function useCTASelector(_selector) {
        const selector = (0, $kYwPG$useMemo)(()=>{
            if (typeof _selector === 'function') return _selector;
            return defaultSelector;
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []);
        const resultRef = (0, $kYwPG$useRef)(null);
        const selectorCallback = (0, $kYwPG$useCallback)((snapshot)=>{
            const result = selector(snapshot);
            if (!(0, $kYwPG$strictDeepEqual)(resultRef.current, result)) resultRef.current = result;
            return resultRef.current;
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        []);
        // @see {@link https://github.com/facebook/react/blob/main/packages/use-sync-external-store/src/useSyncExternalStoreShimClient.js}
        return (0, $kYwPG$useSyncExternalStore)(subscribe, ()=>selectorCallback(snapshot), ()=>selectorCallback(initialSnapshot));
    }
    return Object.assign(useCTASelector, {
        dispatch: dispatch,
        getHistory: getHistory
    });
}


export {$227a13be7aff0c6a$export$32d3704051e6d520 as createCTASelector};
//# sourceMappingURL=createCTASelector.f020623d.js.map
