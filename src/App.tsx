import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './pages/main-page'
import HeaderComponent from './components/Layout/Header/Header'
import { Layout } from 'antd'
import TasksPage from './pages/tasks-page'
import FooterComponent from './components/Layout/Footer/Footer'
import TaskPage from './pages/task-page'
import Login from './pages/login-page'
import { IUser } from './types'
import { useSelector } from 'react-redux'
import { currentUserSelector } from './selectors/usersSelectors'
import { useEffect } from 'react'
import { AppDispatch } from './redux/redux-store'
import { useDispatch } from 'react-redux'
import { CheckAuthAC } from './redux/actions/usersActions'
import Register from './pages/register-page'

const { Content } = Layout

function App() {
    const user: IUser = useSelector(currentUserSelector)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(CheckAuthAC())
        }
    }, [])

    return (
        <BrowserRouter basename="/">
            <div className="App">
                <Layout className="grid-layout">
                    <HeaderComponent
                        userId={user.id}
                        username={user.username}
                    />
                    <Content style={{ gridArea: 'content' }}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/auth" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/tasks" element={<TasksPage />} />
                            <Route path="/task/:id" element={<TaskPage />} />
                            <Route path="*" element={<span>404</span>} />
                        </Routes>
                    </Content>
                    <FooterComponent />
                </Layout>
            </div>
        </BrowserRouter>
    )
}

export default App
