import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import Projects from './pages/Projects';
import ScrollToTop from './components/ScrollToTop';
import FooterCom from './components/Footer.jsx';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import Header from './components/Header';
const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/search' element={<Search />} />
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route element={<OnlyAdminPrivateRoute />}>
        
        <Route path='/update-post/:postId' element={<UpdatePost />} />
      </Route>
      <Route path='/create-post' element={<CreatePost />} />
       <Route path='/projects' element={<Projects />} />
      <Route path='/post/:postSlug' element={<PostPage />} />
    </Routes>
    <FooterCom />
  </BrowserRouter>
  )
}

export default App