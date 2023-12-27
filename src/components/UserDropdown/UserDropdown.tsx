import { NavLink } from 'react-router-dom'
import { UserOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Space } from 'antd'
import cn from 'classnames'
import styles from './../../sass/UserDropdown.module.sass'
import { AppDispatch } from '../../redux/redux-store'
import { useDispatch } from 'react-redux'
import { LogoutAC } from '../../redux/actions/usersActions'

type PropsType = {
    username: string
    userId: string
}

const UserDropDown: React.FC<PropsType> = ({
    username,
    userId,
}): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    const items: MenuProps['items'] = [
        {
            key: 'profileButton',
            label: <NavLink to={`/profile/${userId}`}>Профиль</NavLink>,
            icon: <UserOutlined />,
        },
        {
            key: 'logoutButton',
            label: 'Выйти',
            onClick: () => {
                dispatch(LogoutAC())
            },
            danger: true,
            icon: <LogoutOutlined />,
        },
    ]

    return (
        <div>
            {username && (
                <Dropdown menu={{ items }}>
                    <div className={cn(styles.userInfo)}>
                        <Space>
                            {username}
                            <DownOutlined />
                        </Space>
                    </div>
                </Dropdown>
            )}
            {!username && (
                <NavLink className={cn(styles.userInfo)} to="/auth">
                    Войти
                </NavLink>
            )}
        </div>
    )
}

export default UserDropDown
