import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router';

import Layout from './components/Layout';

import UsersPage from './pages/UsersPage';
import HomePage from './pages/HomePage';
import ApiUsersPage from './pages/ApiUsersPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/api-users' element={<ApiUsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;