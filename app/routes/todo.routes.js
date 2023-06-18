module.exports = (app) => {
  const todos = require("../controllers/todo.controller.js");
  const authJwt = require("../middleware/authJwt.js");

  var router = require("express").Router();

  router.post("/", todos.create);

  router.get("/", todos.findAll);

  router.put("/", authJwt.verifyToken, todos.update);

  router.delete("/:id", todos.delete);

  app.use("/api/todos", router);
};
