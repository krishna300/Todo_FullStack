import { ADD_TODO, DELETE_TODO, EDIT_TODO } from './constants';

export const setInitialTodoData = (data) => {
  return {
    type: ADD_TODO,
    payload: data,
  }
}

export const addTodoHandler = (data) => async (dispatch) => {
  try {
    // Make the fetch call and await the response
    const response = await fetch('/api/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({ todo: data }), // Convert the object to a JSON string
    });

    const {todo} = await response.json();

    const todoData = {
      id:todo._id,
      todo: todo.todo
    }

    dispatch({
      type: ADD_TODO,
      payload: todoData,
    });
  } catch (error) {
    // Handle errors here, you might want to log or dispatch an error action
    console.error('Error adding todo:', error);
    // You might want to dispatch an error action here if needed
    throw error;
  }
};


export const deleteTodoHandler = (id) =>{
    return {
        type:DELETE_TODO,
        payload: id
    }
}

export const editTodoHandler = (id,text) => async (dispatch) => {
  try {
    const response = await fetch('/api/editTodo', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({todoId:id, updatedTodo:text })
    })
    // const {todo} = await response.json()
    dispatch({
      type:EDIT_TODO,
      payload: {
          id,
          data:text,
      }
  })
  } catch (error) {
    console.error('Error editing todo:', error);
  } 
}
