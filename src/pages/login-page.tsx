import cn from 'classnames'
import styles from './../sass/LoginPage.module.sass'
import { Form, Input, Checkbox, Button, Alert } from 'antd'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/redux-store'
import { AuthorizationApiAC } from '../redux/actions/usersActions'
import { NavLink } from 'react-router-dom'

type PropsType = {}

const Login: React.FC<PropsType> = (): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            rememberMe: false,
        },
        onSubmit(values, { setStatus, setSubmitting }) {
            dispatch(AuthorizationApiAC(values, setStatus))
        },
        initialStatus: {
            statusCode: null,
            message: '',
        },
    })

    return (
        <div className={cn(styles.wrapper)}>
            <h1>Авторизация</h1>
            <Form
                className={cn(styles.form)}
                onFinish={formik.handleSubmit}
                initialValues={{
                    username: formik.initialValues.username,
                    password: formik.initialValues.password,
                    rememberMe: formik.initialValues.rememberMe,
                }}
            >
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Username is required!',
                        },
                        {
                            min: 6,
                            message: 'Username must be more than 4 symbols!',
                        },
                        {
                            max: 15,
                            message: 'Password must be less than 15 symbols!',
                        },
                    ]}
                    name="username"
                >
                    <Input
                        maxLength={16}
                        placeholder="Имя пользователя"
                        onChange={(e) => {
                            formik.setFieldValue('username', e.target.value)
                        }}
                        value={formik.values.username}
                    />
                </Form.Item>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Password is required!',
                        },
                        {
                            pattern: /[^[\W]/,
                            message: 'Incorrect password',
                        },
                        {
                            min: 6,
                            message: 'Password must be more than 6 symbols!',
                        },
                        {
                            max: 30,
                            message: 'Password must be less than 30 symbols!',
                        },
                    ]}
                    name="password"
                >
                    <Input.Password
                        type="password"
                        placeholder="Пароль"
                        value={formik.values.password}
                        onChange={(e) => {
                            formik.setFieldValue('password', e.target.value)
                        }}
                    />
                </Form.Item>
                <Form.Item name="rememberMe">
                    <Checkbox
                        value={formik.values.rememberMe}
                        className={cn(styles.checkbox)}
                        onChange={(e) => {
                            formik.setFieldValue('rememberMe', e.target.value)
                        }}
                    >
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <span className={cn(styles.span)}>
                        Не зарегистрированы? {''}
                        {<NavLink to="/register">Зарегистрироваться</NavLink>}
                    </span>
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType="submit"
                        type="primary"
                        className={cn(styles.submitButton)}
                    >
                        Авторизоваться
                    </Button>
                </Form.Item>
                {formik.status.statusCode !== null && (
                    <Form.Item>
                        <Alert
                            type="error"
                            message="Ошибка"
                            description={formik.status.message}
                            showIcon
                        />
                    </Form.Item>
                )}
            </Form>
        </div>
    )
}

export default Login
