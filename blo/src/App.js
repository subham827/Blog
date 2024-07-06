import './App.css';
import * as ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import FooterCom from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import Projects from './pages/Projects';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },{
    path: "/about",
    element: <About/>
  }
]);
function App() {
  return (
    // <RouterProvider router={router} />
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/search' element={<Search/>}/>


      <Route element={<PrivateRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Route>
      <Route element={<OnlyAdminPrivateRoute/>}>
        <Route path='/create-post' element={<CreatePost/>}></Route>
        <Route path='/update-post/:postId' element={<UpdatePost/>}></Route>
      </Route>
      <Route path='/home' element={<Home/>}/>
      <Route path='/post/:postSlug' element={<PostPage/>}/>


    </Routes>
    <FooterCom/>
    </BrowserRouter>
  );
}

export default App;

