import {ADD_TODO, EDIT_TODO} from '../actionCreators/constants'
const initialState = {
    error: null,
    todos:[]
}

const todoReducer =(state=initialState, action) =>{
    switch (action.type) {
        case ADD_TODO:
            return {...state, todos:[action.payload,...state.todos]}
        case EDIT_TODO:
            const updatedTodos = state.todos.map(todo => {
                return todo.id === action.payload.id ? {
                    todo : action.payload.data,
                    id: todo.id,
                }
                : todo
            })
            return {...state, todos:updatedTodos}
        default:
            return state
    }
}

export default todoReducer;