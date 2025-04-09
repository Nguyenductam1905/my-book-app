import { useState } from 'react'
import { Link } from 'react-router-dom'

const TodoNew = (props) => {
    const [input, setInput] = useState("")
    const {addNewTodo} = props
    const handleClickAdd = (input) => {
        addNewTodo(input)
        setInput("")
      }
    const handleOnChange = (e) => {
        setInput(e)
    }
    return (
        <div className="todo-new">
          <div className="add-new">
            <input type="text" value={input}
              placeholder='Add new to do'
              onChange={(e)=>{handleOnChange(e.target.value)}}
            />
            <button onMouseDown={()=>{handleClickAdd(input)}}>Add</button>
          </div>
          <div className='new-title'>Task to add : {input}</div>
        </div>
    )
}

export default TodoNew