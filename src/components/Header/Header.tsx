import cn from 'classnames'
import styles from './../../sass/Header.module.sass'
import { NavLink } from 'react-router-dom'
import { Layout, MenuProps } from 'antd'
import { Menu } from 'antd'

const { Header } = Layout

type PropsType = {}

const HeaderComponent: React.FC<PropsType> = (): JSX.Element => {

    const items: MenuProps['items'] = [
        {
            key: 'tasks',
            label: (
                <NavLink style={{ color: 'white', textTransform: 'uppercase' }} to={'/tasks'} >Задания</NavLink>
            )
        }
    ]

    return (
        <Header className={ cn(styles.header) }>
            <div className={ cn('container', styles.container) }>
                <div className={ cn(styles.logo) }>
                    <NavLink className={ cn(styles.logo) } to={'/'} >Fipi math tasks</NavLink>
                </div>
                <Menu style={{ width: '30%', display: 'flex', justifyContent: 'right' }} theme='dark' mode='horizontal' items={items} />
            </div>
        </Header>
    )
}

export default HeaderComponent