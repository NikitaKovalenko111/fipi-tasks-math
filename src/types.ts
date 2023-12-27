import {
    IAddTaskApiAC,
    IChangeFilterValueAC,
    IChangePaginatorValueAC,
    IGetTaskByIdAC,
    IGetTaskByIdApiAC,
    IGetTasksAC,
    IGetTasksApiAC,
} from './redux/actions/tasksActions'
import {
    IAuthorizationAC,
    IAuthorizationApiAC,
    ICheckAuthAC,
    ILogoutAC,
    IRegisterAC,
    IRemoveUserDataAC,
} from './redux/actions/usersActions'
import { ITasksInitialState } from './redux/reducers/tasksReducer'
import { IUsersInitialState } from './redux/reducers/usersReducer'

export interface ITask {
    _id: string
    taskNumber: number
    difficulty: number
    fileName: string
    answer: string
}

export type TasksActionCreatorsTypes =
    | IGetTasksApiAC
    | IGetTasksAC
    | IChangePaginatorValueAC
    | IChangeFilterValueAC
    | IGetTaskByIdAC
    | IGetTaskByIdApiAC
    | IAddTaskApiAC

export type UserActionCreatorsTypes =
    | IAuthorizationApiAC
    | IAuthorizationAC
    | IRemoveUserDataAC
    | ICheckAuthAC
    | IRegisterAC
    | ILogoutAC

export type RootActions = TasksActionCreatorsTypes & UserActionCreatorsTypes

export type combinedStateTypes = ITasksInitialState & IUsersInitialState

export interface IFilter {
    taskNumber?: number
    difficulty?: number
    difficultySort?: string
}

export interface IRegisterDto {
    username: string
    email: string
    password: string
}

export interface IAuthDto {
    username: string
    password: string
    rememberMe: boolean
}

export interface IPaginator {
    page: number
    pageSize: number
}

export interface IUser {
    username: string
    email: string
    id: string
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IAuth {
    user: IUser
    tokens: ITokens
}

export interface IStatus {
    statusCode: number
    message: string
}

export type statusHandlerType = (status: IStatus) => void
