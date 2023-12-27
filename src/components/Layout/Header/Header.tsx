import cn from 'classnames'
import styles from './../../../sass/Header.module.sass'
import { NavLink, useLocation } from 'react-router-dom'
import { Dropdown, Layout, MenuProps } from 'antd'
import { Menu } from 'antd'
import logo from './../../../images/logo.png'
import UserDropDown from '../../UserDropdown/UserDropdown'

const { Header } = Layout

type PropsType = {
    username: string
    userId: string
}

const HeaderComponent: React.FC<PropsType> = ({
    username,
    userId,
}): JSX.Element => {
    const location = useLocation()

    const currentKey: string = location.pathname.split('').slice(1).join('')

    const items: MenuProps['items'] = [
        {
            key: 'tasks',
            label: (
                <NavLink
                    style={{ color: 'white', textTransform: 'uppercase' }}
                    to={'/tasks'}
                >
                    Задания
                </NavLink>
            ),
        },
    ]

    return (
        <Header className={cn(styles.header)}>
            <div className={cn('container', styles.container)}>
                <div className={cn(styles.logo)}>
                    <NavLink className={cn(styles.logo)} to={'/'}>
                        <img src={logo} alt="logo" />
                    </NavLink>
                </div>
                <Menu
                    selectedKeys={[currentKey]}
                    style={{
                        width: '30%',
                        display: 'flex',
                        justifyContent: 'right',
                    }}
                    theme="dark"
                    mode="horizontal"
                    items={items}
                />
                <UserDropDown userId={userId} username={username} />
            </div>
        </Header>
    )
}

export default HeaderComponent
