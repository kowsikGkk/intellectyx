import * as constants from './Dashboard.constants'
import { getReducerFromObject } from '../../assets/helpers/createReducer'
import { unstable_batchedUpdates } from 'react-dom'

const initialState = {
    users: null,
}
const update = (row, users) => {
    if (row.id)
        return users.map(e => e.id != row.id ? e : row)
    else {
        debugger
        return users.concat({ ...row, id: users.length })
    }
}
const updater = (row, users) => {
    return users.filter(e => e.id != row)
}
const DashboardReducerObj = {
    [constants.STORE_ALL]: (state, payload) => ({ ...state, users: payload }),
    [constants.STORE_NEW]: (state, payload) => ({ ...state, users: update(payload, state.users) }),
    [constants.UPDATE]: (state, payload) => ({ ...state, users: updater(payload, state.users) }),
}

export const DashboardReducer = getReducerFromObject(DashboardReducerObj, initialState)