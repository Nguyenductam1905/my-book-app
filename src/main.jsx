import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@ant-design/v5-patch-for-react-19';
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Book from './pages/Books.jsx';
import Error from './pages/Error.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import TodoApp from './components/todo/TodoApp.jsx';
import UserPage from './pages/User.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children : [
      {
        index: true,
        element: <TodoApp/>
      },
      {
        path: "/users",
        element: <UserPage/>
      },
      {
        path: "/products",
        element: <Book/>
      },
      {

      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RouterProvider router={router}/>
  // </StrictMode>,
)
