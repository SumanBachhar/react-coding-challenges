import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, removeTodo, editTask } from "../features/todoSlice";

export const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    if (editId !== null) {
      dispatch(editTask({ id: editId, text }));
      setEditId(null);
    } else {
      dispatch(addTodo(text));
    }
    setText("");
  };

  const handleEditTask = (id, text) => {
    setEditId(id);
    setText(text);
  };

  return (
    <>
      <div>
        <form onSubmit={addTodoHandler}>
          <h2>Todo List</h2>
          <input
            type="text"
            placeholder="Enter a Todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">{editId !== null ? "Update" : "Add"}</button>
        </form>
      </div>

      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button type="text" onClick={() => dispatch(removeTodo(todo.id))}>
                Delete
              </button>
              <button onClick={() => handleEditTask(todo.id, todo.text)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
