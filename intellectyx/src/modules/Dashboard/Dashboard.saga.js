import { takeLatest, put, call, cancel } from 'redux-saga/effects'
import * as constants from './Dashboard.constants';
import { setAlert } from "../../actions/globalActions";
import request from "../../utils/request";
import { storeAll, storeNew, update } from "./Dashboard.actions";


function* fetchall() {
    try {
        const response = yield call(request, '/users', { method: 'GET' })
        if (response) {
            debugger
            yield put(storeAll(response.response))
        }
        else
            yield put(setAlert({
                message: response.data.message || "Error while fetching records",
                visible: true,
                type: 'error'
            }))
    }
    catch (error) {

        return null
    }
}
function* addUser(data) {
    try {
        const response = yield call(request, '/create', { method: 'POST', data })
        if (response) {
            yield put(storeNew(response.response))
            console.log(response)
        }
        else
            yield put(setAlert({
                message: response.data.message || "Error while fetching records",
                visible: true,
                type: 'error'
            }))
    }
    catch (error) {

        return null
    }
}

function* deleteuser(data) {
    try {
        const response = yield call(request, '/delete/' + data.payload, { method: 'GET' })
        if (response) {
            yield put(update(data.payload))
            console.log(response)
        }
        else
            yield put(setAlert({
                message: response.data.message || "Error while deleting records",
                visible: true,
                type: 'error'
            }))
    }
    catch (error) {

        return null
    }
}



function* cancelSaga(watcher) {
    yield cancel(watcher)
}
export default function* DashboardSagas() {
    const watcher = []
    watcher.push(yield takeLatest(constants.FETCH_ALL, fetchall))
    watcher.push(yield takeLatest(constants.ADD_NEW, addUser))
    watcher.push(yield takeLatest(constants.DELETE, deleteuser))
    yield takeLatest("REMOVE_DASHBOARD", cancelSaga, watcher)

}
