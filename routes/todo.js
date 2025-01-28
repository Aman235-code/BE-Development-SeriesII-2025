import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todo.js";
const router = express.Router();

router.route("/create").post(createTodo);
router.route("/getTodos").get(getAllTodos);
router.route("/:todoId").put(updateTodo);
router.route("/:todoId").delete(deleteTodo);

export default router;
