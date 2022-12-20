const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/register",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted,
      verifySignUp.checkBarsExisted,
    ],
    controller.register
  );
  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);
};
