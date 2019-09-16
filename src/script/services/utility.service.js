import _ from 'lodash';
import {TriggerCallbackOnlyOncePerPeriod} from "./trigger.callback.only.once.per.period.helper";

/*
 *  * Usage & Purpose *
 *
 *  `Util` contains methods which are commonly used but not contained in other services.
 */
export const Util = {
    validateEmail: (email) => {
        const trimWhitespaceLowercase = email.replace(/\s+/g, '').toLowerCase();
        const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regEx.test(trimWhitespaceLowercase)) {
            return trimWhitespaceLowercase;
        }

        return false;
    },
    generateRandom: () => {
        return new Date().valueOf() * Math.random();
    },
    returnPromise: (data, timeout) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, timeout ? timeout : 50);
        });
    },
    prettifyResponse: (data, log) => {
        if (!data) {
            return false;
        }
        if (_.isNumber(data)) {
            return data;
        }
        if (_.isString(data)) {
            if (log) {
                Util.log('response is STRING', data);
            }
            data = data
                .replace(/\\"/g, '"').replace(/\\'/g, "'")
                .replace(/""{/g, '{').replace(/"{/g, '{')
                .replace(/}""/g, '}').replace(/}"/g, '}');

            if (data.indexOf('{') >= 0 && data.indexOf('}')) {
                data = JSON.parse(data);

                return Util.prettifyResponse(data);
            }

            return data;
        }
        if (_.isObject(data) || _.isArray(data)) {
            let prettyData = {};

            _.each(data, (property, key) => {
                if (_.isString(key)) {
                    key = key.replace(/\\"/g, '').replace(/\\'/g, '');
                }

                prettyData[key] = Util.prettifyResponse(property);
            });

            return prettyData;
        }
    },
    replaceAt: (string, index, replacement) => {
        return string.substr(0, index) + replacement + string.substr(index + replacement.length);
    },
    objectToArray: (object) => {
        if (!object) {
            return [];
        }
        let arrayOfProperties = [];

        _.each(object, (propertyValue) => {
            arrayOfProperties.push(propertyValue);
        });

        return arrayOfProperties;
    },
    log: (text, variable) => {
        console.log('-----!----- Log Written Data -----!-----');
        console.log(text);

        if (variable || variable === false || variable === 0) {
            console.log(variable);
        } else {
            console.log('Not Defined');
        }

        console.log('-----!-----!-----!-----');
    },
    truncateString: (string, limit) => {
        if (!string || !limit) return '';
        string = String(string);

        return (string.length > limit) ? string.substr(0, limit - 1) + '...' : string;
    },
    getLocation: (successHandle, failHandle) => {},
    outputOnlyNumbers: (input, warningCallback) => {
        input = String(input);
        let output = '';
        let numbers = '.0123456789';

        for (let i = 0; i < input.length; i++) {
            if (input[i] === ',') {
                output = output + '.';

                return;
            }
            if (numbers.indexOf(input[i]) > -1) {
                output = output + input[i];
            } else if (warningCallback) {
                warningCallback();
            }
        }

        return output;
    },
    triggerCallbackOnlyOncePerPeriod: (callbackKey, callback, period) => {
        return TriggerCallbackOnlyOncePerPeriod(callbackKey, callback, period, Util);
    }
};