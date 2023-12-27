import { useParams } from 'react-router-dom'
import Task from '../components/Tasks/Task/Task'
import { useSelector } from 'react-redux'
import { AppDispatch } from '../redux/redux-store'
import { ITask } from '../types'
import { taskSelector } from '../selectors/tasksSelectors'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTaskByIdApiAC } from '../redux/actions/tasksActions'
import cn from 'classnames'
import styles from './../sass/task-page.module.sass'

type PropsType = {}

const TaskPage: React.FC<PropsType> = (): JSX.Element => {
    const { id } = useParams()

    const dispatch: AppDispatch = useDispatch()

    const task: ITask = useSelector(taskSelector)

    useEffect(() => {
        dispatch(getTaskByIdApiAC(id as string))
    }, [task, id])

    return (
        <div className={cn(styles.wrapper)}>
            <Task
                id={id as string}
                difficulty={task.difficulty}
                answer={task.answer}
                taskNumber={task.taskNumber}
                taskImageSrc={
                    process.env.REACT_APP_API_PATH + '/' + task.fileName
                }
            />
        </div>
    )
}

export default TaskPage
