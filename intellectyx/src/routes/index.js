import React, { Fragment } from "react";
import { Redirect, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../modules/Dashboard'
import { connect } from 'react-redux'
import './styles.css'

const Routes = ({ loggedIn, loading }) => (
    <Router>
        <Switch>
            <Fragment>
                <Route path="/" component={Dashboard} />
            </Fragment>
        </Switch>
    </Router>
)

export default (connect(state => ({
    loggedIn: state.global.loggedIn,
    loading: state.global.loading,
    alert: state.global.alert
}))(Routes));
