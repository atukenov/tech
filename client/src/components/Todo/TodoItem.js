import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAll, update } from "../../slices/todo";
import { clearMessage, setMessage } from "../../slices/message";

const TodoItem = ({ todo, currentPage, order_by }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [task, setTask] = useState(todo.task);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTask(todo.task);
  }, [todo.task]);

  const handleStatusChange = (e) => {
    const checked = e.target.checked;

    const newTodo = {
      ...todo,
      status: checked ? "Completed" : "Pending",
    };
    dispatch(update(newTodo))
      .unwrap()
      .then(() => {
        dispatch(setMessage("Task was updated."));
        dispatch(findAll({ page: currentPage, order_by }));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 3000);
      })
      .catch(() => {
        e.target.checked = !checked;
      });
  };

  const handleTextChange = (e) => {
    setTask(e.target.value);
  };

  const handleSave = () => {
    const newTodo = {
      ...todo,
      edited: true,
      task: task,
    };
    setLoading(true);
    dispatch(update(newTodo))
      .unwrap()
      .then(() => {
        dispatch(setMessage("Task was updated."));
        dispatch(findAll({ page: currentPage, order_by }));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 3000);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setTask(todo.task);
      });
  };

  return (
    <tr>
      <td>{todo.username}</td>
      <td>{todo.email}</td>
      <td>
        {isLoggedIn ? (
          <div className="d-flex align-items-center gap-2">
            <textarea
              name="task"
              value={task}
              // defaultValue={todo.task}
              onChange={handleTextChange}
            />
            <button
              className="btn btn-primary"
              disabled={loading}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        ) : (
          todo.task
        )}
        {todo.edited ? <label>отредактировано администратором</label> : null}
      </td>
      <td>
        <input
          type="checkbox"
          checked={todo.status === "Pending" ? false : true}
          onChange={handleStatusChange}
        />
        {todo.status === "Pending" ? "В прогрессе" : "Выполнено"}
      </td>
      {/* <div>{todo.edited}</div> */}
    </tr>
  );
};

export default TodoItem;
