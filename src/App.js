import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';



const App=()=>{
  return (
    <>
    <Router>
    <Routes>
    <Route index element={<Home/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/login_page' element={<Login/>}/>
    <Route path='/login_page/register_page' element={<Register/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
