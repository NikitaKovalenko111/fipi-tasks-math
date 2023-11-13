import cn from 'classnames'
import styles from './../../sass/Task.module.sass'
import { Collapse, Image } from 'antd'

type PropsType = {
    taskImageSrc: string
    answer: string
}

const Task: React.FC<PropsType> = ({ taskImageSrc, answer }): JSX.Element => {
    return (
        <div className={ cn(styles.task_wrapper) }>
            <Image src={ taskImageSrc } alt='task' width="100%"  />
            <Collapse size='small' items={[ { key: 'answer', label: 'ОТВЕТ', children: <span style={{ fontWeight: 'bold' }}>{ answer }</span> } ]} />
        </div>
    )
}

export default Task