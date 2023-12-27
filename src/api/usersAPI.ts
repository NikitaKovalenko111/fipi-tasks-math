import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { IAuth, IRegisterDto } from '../types'
import store from '../redux/redux-store'
import {
    AuthorizationAC,
    RemoveUserDataAC,
} from '../redux/actions/usersActions'

const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_PATH,
    withCredentials: true,
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        'accessToken'
    )}`
    return config
})

instance.interceptors.response.use(async (value) => {
    const status: number = value.status

    if (status === 401) {
        const data: AxiosResponse<IAuth> = await usersAPI.refreshToken()

        if (data.status === 401) store.dispatch(RemoveUserDataAC())
        else {
            localStorage.setItem('accessToken', data.data.tokens.accessToken)
            store.dispatch(AuthorizationAC(data.data.user))
        }
    }

    return value
})

interface IUserAPI {
    authorization: (
        username: string,
        password: string,
        rememberMe: boolean
    ) => Promise<AxiosResponse<IAuth>>
    refreshToken: () => Promise<AxiosResponse<IAuth>>
    register: (dto: IRegisterDto) => Promise<AxiosResponse<IAuth>>
    logout: () => Promise<AxiosResponse<number>>
}

const usersAPI: IUserAPI = {
    authorization(username, password, rememberMe) {
        return instance
            .post('/auth', {
                username: username,
                password: password,
                rememberMe: rememberMe,
            })
            .then((data) => data.data)
    },
    refreshToken() {
        return axios.get('/auth/refresh', {
            withCredentials: true,
            baseURL: process.env.REACT_APP_API_PATH,
        })
    },
    register(dto) {
        const { username, email, password } = dto

        return instance.post('/registration', {
            username,
            email,
            password,
        })
    },
    logout() {
        return instance.delete('/auth/logout')
    },
}

export default usersAPI
