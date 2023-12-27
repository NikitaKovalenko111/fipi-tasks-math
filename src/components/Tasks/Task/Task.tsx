import Latex from 'react-latex-next'
import cn from 'classnames'
import styles from './../../../sass/Task.module.sass'
import { Collapse, Image, Rate } from 'antd'
import { NavLink } from 'react-router-dom'

type PropsType = {
    taskImageSrc: string
    answer: string
    id: string
    taskNumber: number
    difficulty: number
}

const Task: React.FC<PropsType> = ({
    taskImageSrc,
    answer,
    id,
    taskNumber,
    difficulty,
}): JSX.Element => {
    return (
        <div className={cn(styles.task_wrapper)}>
            <NavLink className={cn(styles.idLink)} to={`/task/${id}`}>
                {id}
            </NavLink>
            <div className={cn(styles.info)}>
                <span className={cn(styles.taskNumber)}>
                    Номер задания: <span>{taskNumber}</span>
                </span>
                <Rate value={difficulty} disabled />
            </div>
            <Image src={taskImageSrc} alt="task" width="100%" />
            {answer !== '' && (
                <Collapse
                    size="small"
                    items={[
                        {
                            key: 'answer',
                            label: 'ОТВЕТ',
                            children: <Latex>{`$$${answer}$$`}</Latex>,
                        },
                    ]}
                />
            )}
        </div>
    )
}

export default Task
