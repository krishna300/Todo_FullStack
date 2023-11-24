import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {editTodoHandler} from '../actionCreators/todo.actions'

const TodoItem = ({ todo }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todo);

  const dispatch = useDispatch()
  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleEditChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editTodoHandler(todo.id, editedText))
    setEditing(false);
  };

  return (
    <li>
      {!isEditing ? (
        <div onDoubleClick={handleDoubleClick}>
          <span>{todo.todo}</span>
          {/* <button onClick={() => onDelete(todo.id)}>Delete</button> */}
        </div>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <input type="text" value={editedText} onChange={handleEditChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </li>
  );
};

export default TodoItem;
