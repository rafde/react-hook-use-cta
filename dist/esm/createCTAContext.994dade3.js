import {useCTA as $5faadda8f7072751$export$68a5bb76170d2250} from "./useCTA.1671ac91.js";
import {createContext as $dFrC2$createContext, createElement as $dFrC2$createElement, useContext as $dFrC2$useContext} from "react";



function $0520831b50975271$export$a85baad6d8324b85(contextParams) {
    const CTAContextHistory = (0, $dFrC2$createContext)({
        changes: null,
        current: contextParams.initial,
        initial: contextParams.initial,
        previous: null,
        previousInitial: null
    });
    const CTAContextDispatch = (0, $dFrC2$createContext)(null);
    return {
        CTAProvider ({ initial: initial = contextParams.initial, onInit: onInit = contextParams.onInit, compare: compare = contextParams.compare, afterActionChange: afterActionChange = contextParams.afterActionChange, children: children }) {
            const [value, dispatch] = (0, $5faadda8f7072751$export$68a5bb76170d2250)({
                initial: initial,
                onInit: onInit,
                actions: contextParams.actions,
                compare: compare,
                afterActionChange: afterActionChange
            });
            return (0, $dFrC2$createElement)(CTAContextHistory.Provider, {
                value: value
            }, (0, $dFrC2$createElement)(CTAContextDispatch.Provider, {
                value: dispatch
            }, children));
        },
        useCTAHistoryContext () {
            return (0, $dFrC2$useContext)(CTAContextHistory);
        },
        useCTADispatchContext () {
            const ctaDispatchContext = (0, $dFrC2$useContext)(CTAContextDispatch);
            if (ctaDispatchContext == null) {
                console.error('useCTADispatchContext was called outside it\'s Provider');
                return ctaDispatchContext;
            }
            return ctaDispatchContext;
        }
    };
}


export {$0520831b50975271$export$a85baad6d8324b85 as createCTAContext};
//# sourceMappingURL=createCTAContext.994dade3.js.map