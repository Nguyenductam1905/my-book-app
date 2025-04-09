import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/layout/header'
import TodoApp from './components/todo/TodoApp'


const App = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
