import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "react-router-redux";
import rootSaga from "../rootsaga";
import { globalReducer } from "../reducers/globalReducers";
import {DashboardReducer} from "../modules/Dashboard/Dashboard.reducer";

const createHistory = require('history').createBrowserHistory;
const history = createHistory();
const reactRouterMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, reactRouterMiddleware];

const rootReducer = combineReducers({
    global: globalReducer,
    DashboardReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware))
); //creating store
sagaMiddleware.run(rootSaga); //run saga
export default store;
