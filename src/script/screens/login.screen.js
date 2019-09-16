// External dependencies
import React from 'react';
import HeaderComponent from "../components/header.component";
import MessageComponent from "../components/message.component";
import SpinnerComponent from "../components/spinner.component";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div id="application-wrapper" className="flex-column-full application-wrapper">
            <MessageComponent
                title={'Login Failed!'}
                text={'Zasto je ovo failovalo ajde objasni mi ?'}
            />

            <HeaderComponent
                enabled={false}
            />

            <div id="application-page" className="flex-1"></div>

            <SpinnerComponent/>
        </div>);
    }
};

