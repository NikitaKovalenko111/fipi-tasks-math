import { combineReducers, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/rootSaga'
import tasksReducer from './reducers/tasksReducer'
import usersReducer from './reducers/usersReducer'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    users: usersReducer,
    tasks: tasksReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store
