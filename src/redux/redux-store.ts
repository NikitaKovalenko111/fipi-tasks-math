import { combineReducers, Reducer, applyMiddleware, createStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga/rootSaga'
//@ts-ignore
const reducers: Reducer = combineReducers({
  
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store