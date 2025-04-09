import { Button } from 'antd'

const TodoList = (props) => {
    const {dataTask, editTask, deleteTask, markDone} = props
    return(
        <div className="todo-data">
          {dataTask.map((task, index) => {
            return (
              <div className='mark-task' key={index}>
                <li className={"task"}>{task.name}</li>
                <div className="set-task">
                  <Button type='dashed' onClick={() => {editTask(task)}}>Edit</Button >
                  <Button type='dashed' onClick={() => {deleteTask(index)}}>Delete</Button >
                  <Button type='dashed' onClick={() => {markDone()}}>Mark as done</Button >
                </div>
              </div>
            )
          })}
        </div>
    )
}

export default TodoList