import { call, put, takeLatest } from 'redux-saga/effects'
import { UsersActionTypes } from '../reducers/usersReducer'
import {
    AuthorizationAC,
    IAuthorizationApiAC,
    IRegisterAC,
    RemoveUserDataAC,
} from '../actions/usersActions'
import { IAuth } from '../../types'
import usersAPI from '../../api/usersAPI'
import axios, { AxiosResponse } from 'axios'

export function* authorizationSagaWatcher() {
    yield takeLatest(
        UsersActionTypes.AUTHORIZATION_API,
        authorizationSagaWorker
    )
}

function* authorizationSagaWorker(action: IAuthorizationApiAC) {
    const { username, password, rememberMe } = action.payload.dto
    const statusHandler = action.payload.statusHandler

    try {
        const data: IAuth = yield call(
            usersAPI.authorization,
            username,
            password,
            rememberMe
        )

        yield localStorage.setItem('accessToken', data.tokens.accessToken)
        yield put(AuthorizationAC(data.user))
    } catch (error) {
        if (axios.isAxiosError(error)) {
            statusHandler({
                statusCode: error.response?.data.statusCode,
                message: error.response?.data.message,
            })
        }
    }
}

export function* logoutSagaWatcher() {
    yield takeLatest(UsersActionTypes.LOGOUT, logoutSagaWorker)
}

function* logoutSagaWorker() {
    try {
        const data: AxiosResponse<number> = yield call(usersAPI.logout)

        if (data.data === 200) {
            yield put(RemoveUserDataAC())

            yield localStorage.removeItem('accessToken')
        }
    } catch (error) {
        console.log(error)
    }
}

export function* checkAuthSagaWatcher() {
    yield takeLatest(UsersActionTypes.CHECK_AUTH, checkAuthSagaWorker)
}

function* checkAuthSagaWorker() {
    const data: AxiosResponse<IAuth> = yield call(usersAPI.refreshToken)

    if (data.status === 401) {
        yield put(RemoveUserDataAC())
    } else {
        localStorage.setItem('accessToken', data.data.tokens.accessToken)
        yield put(AuthorizationAC(data.data.user))
    }
}

export function* registerSagaWatcher() {
    yield takeLatest(UsersActionTypes.REGISTER, registerSagaWorker)
}

function* registerSagaWorker(action: IRegisterAC) {
    const { statusHandler, user } = action.payload

    try {
        const response: AxiosResponse<IAuth> = yield call(
            usersAPI.register,
            user
        )

        yield action.payload.statusHandler({
            statusCode: response.status,
            message: '',
        })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            statusHandler({
                statusCode: error.response?.data.statusCode,
                message: error.response?.data.message,
            })
        } else {
            console.log('error')
        }
    }
}
