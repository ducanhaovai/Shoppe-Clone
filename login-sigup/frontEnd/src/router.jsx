import { createBrowserRouter } from 'react-router-dom'
import Login from './components/loginGoogle/login'

import { LoginSignup } from "./components/login-signup/LoginSignup";
import LoginGoogle from './components/loginGoogle';
import { Indexs } from './components/header/Indexs';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Indexs />
  },
  {
    path: '/login',
    element: <LoginSignup />
  },
  {
    path: '/login',
    element: <LoginGoogle/>
  },
  {
    path: '/login/oauth',
    element: < Login/>
  }
])

export default router
