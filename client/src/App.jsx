import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'
import Dashboard  from './pages/Dashboard'
import Header from './components/Header';
import Projects from './pages/Projects'
import Singup from './pages/Singup'
import SignIn from './pages/SignIn';
import Footer from './pages/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/Create-post'
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search';

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/About' element={<About/>}/>
    <Route path='/signin' element = {<SignIn/>}/>
      <Route path='/signup' element={<Singup/>}/>
      <Route path='/search' element={<Search/>}/>
      
      <Route element={<PrivateRoute/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
      <Route path='/create-post' element={<CreatePost/>}/>
      <Route path='/updatepost/:postId' element={<UpdatePost/>}/>
      </Route>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/post/:postSlug' element={<PostPage/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
   
  )
}

export default App
