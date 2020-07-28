import { all } from "redux-saga/effects";
import DashboardSagas from "../modules/Dashboard/Dashboard.saga";

export default function* rootSaga() {
    yield all([
        DashboardSagas()
    ]);
}
