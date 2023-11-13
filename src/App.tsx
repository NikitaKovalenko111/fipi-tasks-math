import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main-page';
import HeaderComponent from './components/Header/Header';
import { Layout } from 'antd';
import TasksPage from './pages/tasks-page';
import FooterComponent from './components/Footer/Footer';

const { Content } = Layout

function App() {
  return (
    <BrowserRouter basename='/'>
      <div className="App">
        <Layout className='grid-layout'>
          <HeaderComponent />
          <Content style={{ gridArea: 'content' }} >
            <Routes>
              <Route path='/' element={ <MainPage /> } />
              <Route path='/tasks' element={ <TasksPage /> } />
            </Routes>
          </Content>
          <FooterComponent />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
