import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { create, findAll } from "../../slices/todo";
import TodoItem from "./TodoItem";
import Pagination from "../Pagination";
import { clearMessage, setMessage } from "../../slices/message";

const TodoList = () => {
  const { todos, totalPages, currentPage, totalItems } = useSelector(
    (state) => state.todo
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [sorting, setSorting] = useState({
    username: "",
    email: "",
    task: "",
  });

  const initialValues = {
    username: "",
    email: "",
    task: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    email: Yup.string().email().required("This field is required"),
    task: Yup.string().required("This field is required!"),
  });

  useEffect(() => {
    dispatch(findAll({ page: currentPage, order_by: orderBy }));
  }, [dispatch, currentPage, orderBy]);

  const handleSubmit = (formValue, { resetForm }) => {
    setLoading(true);
    dispatch(create(formValue))
      .unwrap()
      .then(() => {
        dispatch(setMessage("Task was added."));
        resetForm();
        setLoading(false);
        dispatch(findAll({ page: currentPage, order_by: orderBy }));
        setTimeout(() => {
          dispatch(clearMessage());
        }, 3000);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleSort = (sortItem) => {
    console.log(sorting);
    const type = sorting[sortItem] === "ASC" ? "DESC" : "ASC";
    setSorting({ ...sorting, [sortItem]: type });
    setOrderBy(`${sortItem}:${type}`);
    dispatch(findAll({ page: currentPage, order_by: `${sortItem}:${type}` }));
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h3>Задачи</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {todos.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" onClick={() => handleSort("username")}>
                      Имя пользователя
                    </th>
                    <th scope="col" onClick={() => handleSort("email")}>
                      Email
                    </th>
                    <th scope="col" onClick={() => handleSort("task")}>
                      Текст задачи
                    </th>
                    <th scope="col">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo, index) => {
                    return <TodoItem key={index} todo={todo} />;
                  })}
                  {!isLoggedIn ? (
                    <tr>
                      <td>
                        <Field name="username" placeholder="Имя пользователя" />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-danger"
                        />
                      </td>
                      <td>
                        <Field name="email" placeholder="Email" />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </td>
                      <td>
                        <Field name="task" placeholder="Текст задачи" />
                        <ErrorMessage
                          name="task"
                          component="div"
                          className="text-danger"
                        />
                      </td>{" "}
                      <td>
                        <button
                          type="submit"
                          className="px-3 py-1 bg-primary border-0 text-white"
                          disabled={loading}
                        >
                          +
                        </button>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            ) : (
              <div>No tasks</div>
            )}
          </Form>
        </Formik>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalItems}
          order_by={orderBy}
        />
      </div>
    </div>
  );
};

export default TodoList;
