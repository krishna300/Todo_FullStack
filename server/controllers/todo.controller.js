import Todo from '../models/todo.model.js';
export const addTodoController = async (req, res) => {
  const { todo } = req.body;
  const newTodo = new Todo({ todo });

  try {
    // Save the newTodo to the database
    await newTodo.save();

    // Return the created Todo object in the response
    res.status(201).json({ message: `Todo: ${todo} added!!`, todo: newTodo.toJSON() });
  } catch (err) {
    // Handle errors and send an appropriate response
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

export const getTodosController = async (req,res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json({ todos });
    } catch (err) {
        res.status(err.statusCode || 500).json({ error: err });
    }
} 

export const editTodoController = async (req, res) => {
  const { todoId, updatedTodo } = req.body;

  try {
    const existingTodo = await Todo.findById(todoId);
    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    existingTodo.todo = updatedTodo;
    await existingTodo.save();

    res.status(200).json({ message: `Todo updated!!`, todo: existingTodo.toJSON() });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};