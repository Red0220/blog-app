import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'
import Dashboard  from './pages/Dashboard'
import Header from './components/Header';
import Projects from './pages/Projects'
import Singup from './pages/Singup'
import SignIn from './pages/SignIn';


function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/About' element={<About/>}/>
    <Route path='/signin' element = {<SignIn/>}/>
      <Route path='/signup' element={<Singup/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Projects/>}/>
    </Routes>
    </BrowserRouter>
   
  )
}

export default App
