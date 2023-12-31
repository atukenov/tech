module.exports = (app) => {
  const auth = require("../controllers/auth.controller");

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  router.post("/signin", auth.signin);

  app.use("/api/auth", router);
};
