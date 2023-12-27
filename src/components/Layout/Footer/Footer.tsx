import { Layout } from 'antd'
import cn from 'classnames'
import styles from './../../../sass/Footer.module.sass'

const { Footer } = Layout

type PropsType = {}

const FooterComponent: React.FC<PropsType> = (): JSX.Element => {
    return (
        <Footer className={cn(styles.footer)}>
            <div className={cn(styles.container, 'container')}>
                <span>Автор: Никита Коваленко 10А</span>
            </div>
        </Footer>
    )
}

export default FooterComponent
