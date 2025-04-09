import { useState } from 'react'
import { Button } from 'antd'
import './todo.css'
import TodoNew from './TodoNew'
import TodoList from './TodoList'

const TodoApp = () => {
    const [dataTask, setDataTask] = useState([])
    const addNewTodo = (name) => {
        const data = {
            id: randomID(1,3000),
            name: name
          }
        setDataTask([...dataTask, data])
    }
    const randomID = (min, max) => {
      return Math.random()*(max-min) + min
    }
    const handleClickAdd = (e) => {
      e.preventDefault()
      
      setInput("")
    }
    const deleteTask = (id) => {
      setDataTask(dataTask.filter((task, index)=> index !== id))
    }
    const editTask = (task) => {
      const newTitle = prompt("Edit this task here: ")
      task.name = newTitle
      setDataTask([...dataTask])
    }
    const markDone = () => {

    }
    return (
        <div className="container">
        <div className='todo-list'>To do List</div>
        <TodoNew
        addNewTodo = {addNewTodo}
        handleClickAdd = {handleClickAdd}
        />
        <TodoList
        dataTask = {dataTask}
        editTask = {editTask}
        deleteTask = {deleteTask}
        markDone = {markDone}
        />
      </div>
    )
}

export default TodoApp