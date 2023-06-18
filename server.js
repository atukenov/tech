const express = require("express");
const cors = require("cors");
const { seed } = require("./seed");

const db = require("./app/models");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    console.log("Synced db.");
    // seed();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

require("./app/routes/todo.routes")(app);
require("./app/routes/auth.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
