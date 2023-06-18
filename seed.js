const db = require("./app/models");

const seed = () => {
  db.users.create({
    username: "admin",
    password: "$2a$08$d8YgxkWYhVIHn7NdFRqu8esVwEbVVX73oMSyL2TPbvWC2pW1b68XO",
  });
  db.todos.create({
    task: "I must finish by Monday",
    username: "john",
    email: "john@gmail.com",
    status: "Pending",
  });
  db.todos.create({
    task: "I must finish by Tuesday",
    username: "eric",
    email: "eric@gmail.com",
    status: "Pending",
  });
  db.todos.create({
    task: "I must finish by Friday",
    username: "albert",
    email: "albert@gmail.com",
    status: "Pending",
  });
  db.todos.create({
    task: "I must finish by Sunday",
    username: "tyson",
    email: "tyson@gmail.com",
    status: "Pending",
  });
};
module.exports = {
  seed,
};
