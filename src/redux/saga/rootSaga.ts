import { all, fork } from 'redux-saga/effects'
import {
    addTaskSagaWatcher,
    getTaskByIdSagaWatcher,
    getTasksSagaWatcher,
} from './tasksSagas'
import {
    authorizationSagaWatcher,
    checkAuthSagaWatcher,
    logoutSagaWatcher,
    registerSagaWatcher,
} from './usersSagas'

export default function* rootSaga() {
    yield all([
        fork(addTaskSagaWatcher),
        fork(getTasksSagaWatcher),
        fork(getTaskByIdSagaWatcher),
        fork(authorizationSagaWatcher),
        fork(checkAuthSagaWatcher),
        fork(registerSagaWatcher),
        fork(logoutSagaWatcher),
    ])
}
