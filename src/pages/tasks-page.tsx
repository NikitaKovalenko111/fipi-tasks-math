import Task from '../components/Tasks/Task/Task'
import cn from 'classnames'
import styles from './../sass/tasks-page.module.sass'
import Paginator from '../components/Tasks/Paginator/Paginator'
import TasksFilter from '../components/Tasks/TasksFilter/TasksFilter'
import { useEffect, useState } from 'react'
import { Button } from 'antd'
import AddForm from '../components/Tasks/AddForm/AddForm'
import { IFilter, IPaginator, ITask } from '../types'
import { AppDispatch } from '../redux/redux-store'
import { useSelector } from 'react-redux'
import {
    filterSelector,
    paginatorSelector,
    tasksSelector,
    totalSelector,
} from '../selectors/tasksSelectors'
import { useDispatch } from 'react-redux'
import { getTasksApiAC } from '../redux/actions/tasksActions'

type PropsType = {}

const TasksPage: React.FC<PropsType> = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    const [isAddFormVisible, ChangeIsAddFormVisible] = useState<boolean>(false)

    const tasks: Array<ITask> = useSelector(tasksSelector)
    const total: number = useSelector(totalSelector)
    const paginator: IPaginator = useSelector(paginatorSelector)
    const filter: IFilter = useSelector(filterSelector)

    useEffect(() => {
        dispatch(getTasksApiAC(paginator.page, paginator.pageSize, filter))
    }, [paginator, dispatch, filter])

    return (
        <div className={cn('container', styles.container)}>
            <h1>ЕГЭ задания по профильной математике</h1>
            <TasksFilter />
            <div className={cn(styles.tasks_wrapper)}>
                {tasks.map((el) => {
                    return (
                        <Task
                            key={el._id}
                            id={el._id}
                            taskNumber={el.taskNumber}
                            difficulty={el.difficulty}
                            taskImageSrc={
                                (process.env.REACT_APP_API_PATH as string) +
                                '/' +
                                el.fileName
                            }
                            answer={el.answer}
                        />
                    )
                })}
            </div>
            {!isAddFormVisible && (
                <Button
                    onClick={() => {
                        ChangeIsAddFormVisible(true)
                    }}
                    style={{ height: '40px', textTransform: 'uppercase' }}
                >
                    Добавить задание
                </Button>
            )}
            {isAddFormVisible && (
                <AddForm changeIsAddFormVisible={ChangeIsAddFormVisible} />
            )}
            <Paginator total={total} />
        </div>
    )
}

export default TasksPage
