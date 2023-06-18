module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todo", {
    task: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    edited: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return Todo;
};
