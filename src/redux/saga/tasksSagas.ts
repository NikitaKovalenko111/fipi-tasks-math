import { ITask } from './../../types'
import { put, select, takeLatest } from 'redux-saga/effects'
import { ActionTypesList } from '../reducers/tasksReducer'
import { IPaginator } from '../../types'
import tasksAPI, { IResponseGetTasks } from '../../api/tasksAPI'
import {
    IAddTaskApiAC,
    getTasksAC,
    getTasksApiAC,
    IGetTasksApiAC,
    IGetTaskByIdApiAC,
    getTaskByIdAC,
} from '../actions/tasksActions'
import { paginatorSelector } from '../../selectors/tasksSelectors'

export function* addTaskSagaWatcher() {
    yield takeLatest(ActionTypesList.ADD_TASK_API, addTaskSagaWorker)
}

function* addTaskSagaWorker(action: IAddTaskApiAC) {
    const formData: FormData = new FormData()

    formData.append('taskNumber', String(action.payload.taskNumber))
    formData.append('difficulty', String(action.payload.difficulty))
    formData.append('answer', String(action.payload.answer))
    formData.append('taskImage', action.payload.file)

    yield tasksAPI.postTask(formData)

    const paginator: IPaginator = yield select(paginatorSelector)

    yield put(getTasksApiAC(paginator.page, paginator.pageSize))
}

export function* getTasksSagaWatcher() {
    yield takeLatest(ActionTypesList.GET_TASKS_API, getTasksSagaWorker)
}

function* getTasksSagaWorker(action: IGetTasksApiAC) {
    const data: IResponseGetTasks = yield tasksAPI.getTasks(
        action.payload.page,
        action.payload.pageSize,
        action.payload.filter
    )

    yield put(getTasksAC(data.tasks, data.total))
}

export function* getTaskByIdSagaWatcher() {
    yield takeLatest(ActionTypesList.GET_TASK_BY_ID_API, getTaskByIdSagaWorker)
}

function* getTaskByIdSagaWorker(action: IGetTaskByIdApiAC) {
    const data: ITask = yield tasksAPI.getTaskById(action.payload.id)

    yield put(getTaskByIdAC(data))
}
