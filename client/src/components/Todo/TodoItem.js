import React from "react";
import { useDispatch } from "react-redux";
import { update } from "../../slices/todo";
import { clearMessage, setMessage } from "../../slices/message";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const checked = e.target.checked;
    console.log(todo.id, checked);
    const newTodo = {
      ...todo,
      status: checked ? "Completed" : "Pending",
    };
    dispatch(update(newTodo))
      .unwrap()
      .then(() => {
        dispatch(setMessage("Task was updated."));
        // dispatch(findAll({ page: currentPage, order_by: orderBy }));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 3000);
      })
      .catch(() => {
        e.target.checked = !checked;
      });
  };

  return (
    <tr>
      <td>{todo.username}</td>
      <td>{todo.email}</td>
      <td>{todo.task}</td>
      <td>
        <input
          type="checkbox"
          checked={todo.status === "Pending" ? false : true}
          onChange={handleChange}
        />
      </td>
      {/* <div>{todo.edited}</div> */}
    </tr>
  );
};

export default TodoItem;
