// External dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import Aviator from 'aviator';
// Internal dependencies
import LoginScreen from '../screens/login.screen';
import EventsScreen from "../screens/events.screen";

const rootApplicationId = 'root';
const rootScreenId = 'application-page';

const LoginTarget = {
    screen: () => {
        ReactDOM.render(<LoginScreen />, document.getElementById(rootApplicationId));
    }
};
const EventsTarget = {
    screen: () => {
        ReactDOM.render(<EventsScreen />, document.getElementById(rootScreenId));
    }
};

Aviator.setRoutes({
    target: LoginTarget,
    '/*': 'screen',
    '/events': {
        target: EventsTarget,
        '/*': 'screen'
    }
});

export const RouterService = {
    watchRoutes: () => {
        Aviator.dispatch();
    }
};

