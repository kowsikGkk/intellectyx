import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from "react-redux";
import Routes from './routes/index'
import store from "./store";
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Routes />
        </Provider>
    </AppContainer>,
    document.getElementById('root')
);

serviceWorker.unregister();