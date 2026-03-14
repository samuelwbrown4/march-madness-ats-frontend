import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateLeague from './pages/CreateLeague';
import UserDashboard from './pages/UserDashboard';
import BracketPage from './pages/BracketPage';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import './styles/styles.css';
import './App.css'



function App() {


  const [token, setToken] = useState('');



  


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/create-league' element={<CreateLeague />}></Route>
        <Route path='/bracket/:leagueId' element={<BracketPage/>}></Route>
        <Route path='/user-dashboard/:leagueId' element={<UserDashboard/>}></Route>
        <Route path='/admin-login' element={<AdminLogin setToken={setToken}/>}></Route>
        <Route path='/admin-dashboard' element={<AdminDashboard token={token} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
