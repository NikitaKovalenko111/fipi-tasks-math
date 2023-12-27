import { AnyAction } from 'redux'
import { UsersActionTypes } from '../reducers/usersReducer'
import {
    IAuthDto,
    IRegisterDto,
    IStatus,
    IUser,
    statusHandlerType,
} from '../../types'

export interface IAuthorizationApiAC extends AnyAction {
    type: typeof UsersActionTypes.AUTHORIZATION_API
    payload: {
        dto: IAuthDto
        statusHandler: statusHandlerType
    }
}

export interface IAuthorizationAC extends AnyAction {
    type: typeof UsersActionTypes.AUTHORIZATION
    payload: IUser
}

export interface IRemoveUserDataAC extends AnyAction {
    type: typeof UsersActionTypes.DELETE_USER_DATA
}

export interface ICheckAuthAC extends AnyAction {
    type: typeof UsersActionTypes.CHECK_AUTH
}

export interface IRegisterAC extends AnyAction {
    type: typeof UsersActionTypes.REGISTER
    payload: {
        user: IRegisterDto
        statusHandler: statusHandlerType
    }
}

export interface ILogoutAC extends AnyAction {
    type: typeof UsersActionTypes.LOGOUT
}

export const AuthorizationApiAC = (
    dto: IAuthDto,
    statusHandler: statusHandlerType
): IAuthorizationApiAC => ({
    type: UsersActionTypes.AUTHORIZATION_API,
    payload: {
        dto: dto,
        statusHandler: statusHandler,
    },
})

export const AuthorizationAC = (user: IUser): IAuthorizationAC => ({
    type: UsersActionTypes.AUTHORIZATION,
    payload: {
        username: user.username,
        email: user.email,
        id: user.id,
    },
})

export const RemoveUserDataAC = (): IRemoveUserDataAC => ({
    type: UsersActionTypes.DELETE_USER_DATA,
})

export const CheckAuthAC = (): ICheckAuthAC => ({
    type: UsersActionTypes.CHECK_AUTH,
})

export const RegisterAC = (
    dto: IRegisterDto,
    statusHandler: statusHandlerType
): IRegisterAC => ({
    type: UsersActionTypes.REGISTER,
    payload: {
        user: dto,
        statusHandler: statusHandler,
    },
})

export const LogoutAC = (): ILogoutAC => ({
    type: UsersActionTypes.LOGOUT,
})
