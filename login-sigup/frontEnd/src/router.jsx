import { createBrowserRouter } from 'react-router-dom'
import Login from './features/loginGoogle/login'


import LoginGoogle from './features/loginGoogle/index';
import { Indexs } from './components/header/Indexs';
import { LoginSignup } from './pages/login-signup/index';

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
    element: <LoginGoogle />
  },
  {
    path: '/login/oauth',
    element: < Login />
  }
])

export default router
