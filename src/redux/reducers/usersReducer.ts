import { Reducer } from 'redux'
import { IUser, UserActionCreatorsTypes } from '../../types'

export interface IUsersInitialState {
    currentUser: IUser
    isAuthorized: boolean
    users: Array<IUser>
}

const initialState: IUsersInitialState = {
    currentUser: {
        username: '',
        email: '',
        id: '',
    },
    isAuthorized: false,
    users: [],
}

export enum UsersActionTypes {
    AUTHORIZATION_API = 'users/AUTHORIZATION_API',
    AUTHORIZATION = 'users/AUTHORIZATION',
    DELETE_USER_DATA = 'users/DELETE_USER_DATA',
    CHECK_AUTH = 'users/CHECK_AUTH',
    REGISTER = 'users/REGISTER',
    LOGOUT = 'users/LOGOUT',
}

const usersReducer: Reducer<IUsersInitialState, UserActionCreatorsTypes> = (
    state = initialState,
    action: UserActionCreatorsTypes
): IUsersInitialState => {
    switch (action.type) {
        case UsersActionTypes.AUTHORIZATION: {
            return { ...state, currentUser: action.payload, isAuthorized: true }
        }

        case UsersActionTypes.DELETE_USER_DATA: {
            return {
                ...state,
                currentUser: initialState.currentUser,
                isAuthorized: false,
            }
        }

        default:
            return state
    }
}

export default usersReducer
