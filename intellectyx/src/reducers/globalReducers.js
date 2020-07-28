import * as constants from '../actions/types'
import { getReducerFromObject } from "../assets/helpers/createReducer";

const initialState = {
    alert: {
        visible: false,
        message: '',
        type: 'error',
    },
    firstLayer: false,
    loggedIn: localStorage.getItem("access-token") ? true : false,
    loading: false,
    userDetails: []
}

const globalReducerObj = {
    [constants.SET_GLOBAL]: (state, payload) => ({ ...state, ...payload }),
    [constants.SET_ALERT]: (state, payload) => ({ ...state, alert: { ...state.alert, ...payload } }),
    [constants.RESET_GLOBAL_DATA]: () => initialState,
    [constants.LOGIN]: (state, payload) => ({ ...state, loggedIn: payload }),
    [constants.LOADING]: (state, payload) => ({ ...state, loading: payload }),
}

export const globalReducer = getReducerFromObject(globalReducerObj, initialState)