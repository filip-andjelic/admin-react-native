let callbacksTriggerMap = {};

export const TriggerCallbackOnlyOncePerPeriod = (callbackKey, callback, period) => {
    return new Promise(() => {
        function interval(callbackObject) {
            clearInterval(callbackObject.interval);

            callbackObject.callback();
        }

        if (callbacksTriggerMap[callbackKey]) {
            clearInterval(callbacksTriggerMap[callbackKey].interval);
        }

        callbacksTriggerMap[callbackKey] = {
            duration: period,
            interval: setInterval(() => {
                interval(callbacksTriggerMap[callbackKey]);
            }, period),
            callback: callback
        };
    });
};