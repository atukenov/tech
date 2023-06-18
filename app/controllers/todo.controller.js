const db = require("../models");
const Todo = db.todos;
const Op = db.Sequelize.Op;

const { getPagination, getPagingData } = require("../utils/pagination");

exports.create = (req, res) => {
  if (!req.body.task) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  if (!req.body.username) {
    res.status(400).send({
      message: "Please enter username!",
    });
    return;
  }
  if (!req.body.email) {
    res.status(400).send({
      message: "Email should be valid!",
    });
    return;
  }

  const todo = {
    task: req.body.task,
    username: req.body.username,
    email: req.body.email,
    status: "Pending",
  };

  Todo.create(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Todo.",
      });
    });
};

exports.findAll = (req, res) => {
  const { page, size, order_by } = req.query;

  const [field, orderType] = order_by.split(":");
  const { limit, offset } = getPagination(page, size);

  const order = field && orderType ? [[`${field}`, `${orderType}`]] : "";

  console.log(order);

  Todo.findAndCountAll({ limit, offset, order })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.id;

  Todo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Todo with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Todo with id=" + id,
      });
    });
};
