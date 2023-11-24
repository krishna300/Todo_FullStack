import express from "express";
import { addTodoController, getTodosController, editTodoController } from "../controllers/todo.controller.js";

const router = express.Router()

router.post('/addTodo', addTodoController)
router.get('/todos', getTodosController)
router.post('/editTodo', editTodoController)
export default router;