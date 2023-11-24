import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodoHandler, setInitialTodoData } from '../actionCreators/todo.actions'
import TodoItem from './TodoItem'

var isCalled = false;

const TodoApp = () => {
  const [todo, setTodo] = useState('')
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const todos = useSelector(state => state.todos.todos)

  useEffect(() => {

    if (isCalled) {
      return;
    }
    isCalled=true;
    console.log('useEffect is running!');
    fetch('/api/todos')
      .then(res=>res.json())
      .then(res => {
        const data = res.todos.map(todoObject => {
          return{
            id:todoObject._id,
            todo:todoObject.todo,
          }
        })
        data.forEach(element => {
            dispatch(setInitialTodoData(element))
        });
      })
      .catch(err => console.log('EEEEEEEEEEE',{err}))
  },[])

  return (
    <div>
        <h3>Hello Task Manager !!</h3>
        <input 
            type='text'
            value={todo}
            onChange={handleChange}
        />
        <button onClick={() => {
          if(todo === ''){
            return
          }
          dispatch(addTodoHandler(todo))
          setTodo('')
        }}>
          Go Add
        </button>

        {todos.map(todoItem => {
          return <TodoItem todo={todoItem} key={todoItem.id}/>
        })} 
    </div>
  )
}

export default TodoApp