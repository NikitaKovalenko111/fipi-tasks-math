import Task from "../components/Task/Task"
import tastImg from './../Screenshot_37.png'
import cn from 'classnames'
import styles from './../sass/tasks-page.module.sass'

type PropsType = {}

const TasksPage: React.FC<PropsType> = (): JSX.Element => {
    return (
        <div className={ cn('container', styles.container) }>
            <div className={ cn(styles.tasks_wrapper) }>
                <Task answer="Какой то там ответ" taskImageSrc={tastImg} />
                <Task answer="Какой то там ответ" taskImageSrc={tastImg} />
                <Task answer="Какой то там ответ" taskImageSrc={tastImg} />
                <Task answer="Какой то там ответ" taskImageSrc={tastImg} />
                <Task answer="Какой то там ответ" taskImageSrc={tastImg} />
                <Task answer="Какой то там ответ" taskImageSrc={tastImg} />
                <Task answer="Какой то там ответ" taskImageSrc={tastImg} />
                <Task answer="Какой то там ответ" taskImageSrc={tastImg} />
                <Task answer="Какой то там ответ" taskImageSrc={tastImg} />
            </div>
        </div>
    )
}

export default TasksPage