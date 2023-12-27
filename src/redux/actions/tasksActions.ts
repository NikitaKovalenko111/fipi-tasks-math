import { AnyAction } from 'redux'
import { IFilter, IPaginator, ITask } from '../../types'
import { ActionTypesList } from '../reducers/tasksReducer'

export interface IAddTaskApiAC extends AnyAction {
    type: typeof ActionTypesList.ADD_TASK_API
    payload: {
        taskNumber: number
        difficulty: number
        file: File
        answer: string
    }
}

export interface IGetTasksApiAC extends AnyAction {
    type: typeof ActionTypesList.GET_TASKS_API
    payload: {
        page: number
        pageSize: number
        filter?: IFilter
    }
}

export interface IGetTasksAC extends AnyAction {
    type: typeof ActionTypesList.GET_TASKS
    payload: {
        tasks: Array<ITask>
        total: number
    }
}

export interface IChangePaginatorValueAC extends AnyAction {
    type: typeof ActionTypesList.CHANGE_PAGINATOR_VALUE
    payload: {
        paginator: IPaginator
    }
}

export interface IChangeFilterValueAC extends AnyAction {
    type: typeof ActionTypesList.CHANGE_FILTER_VALUE
    payload: {
        filter: IFilter
    }
}

export interface IGetTaskByIdApiAC extends AnyAction {
    type: typeof ActionTypesList.GET_TASK_BY_ID_API
    payload: {
        id: string
    }
}

export interface IGetTaskByIdAC extends AnyAction {
    type: typeof ActionTypesList.GET_TASK_BY_ID
    payload: {
        task: ITask
    }
}

export const getTasksApiAC = (
    page: number,
    pageSize: number,
    filter?: IFilter
): IGetTasksApiAC => ({
    type: ActionTypesList.GET_TASKS_API,
    payload: {
        page: page,
        pageSize: pageSize,
        filter: filter,
    },
})

export const getTasksAC = (
    tasks: Array<ITask>,
    total: number
): IGetTasksAC => ({
    type: ActionTypesList.GET_TASKS,
    payload: {
        tasks: tasks,
        total: total,
    },
})

export const changePaginatorValueAC = (
    paginator: IPaginator
): IChangePaginatorValueAC => ({
    type: ActionTypesList.CHANGE_PAGINATOR_VALUE,
    payload: {
        paginator: paginator,
    },
})

export const changeFilterValueAC = (filter: IFilter): IChangeFilterValueAC => ({
    type: ActionTypesList.CHANGE_FILTER_VALUE,
    payload: {
        filter: filter,
    },
})

export const addTaskApiAC = (
    taskNumber: number,
    difficulty: number,
    file: File,
    answer: string
): IAddTaskApiAC => ({
    type: ActionTypesList.ADD_TASK_API,
    payload: {
        taskNumber: taskNumber,
        difficulty: difficulty,
        file: file,
        answer: answer,
    },
})

export const getTaskByIdApiAC = (id: string): IGetTaskByIdApiAC => ({
    type: ActionTypesList.GET_TASK_BY_ID_API,
    payload: {
        id: id,
    },
})

export const getTaskByIdAC = (task: ITask): IGetTaskByIdAC => ({
    type: ActionTypesList.GET_TASK_BY_ID,
    payload: {
        task: task,
    },
})
