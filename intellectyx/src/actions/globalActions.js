import * as constants from './types';

export const setGlobal = payload => ({ type: constants.SET_GLOBAL, payload })
export const setAlert = payload => ({ type: constants.SET_ALERT, payload })
export const resetGlobalData = payload => ({ type: constants.RESET_GLOBAL_DATA, payload })
export const login = payload => ({ type: constants.LOGIN, payload })