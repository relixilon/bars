const { authJwt, upload } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.post("/api/user/getDay", [authJwt.verifyToken], controller.getDay);

  app.post("/api/user/submitDay", [authJwt.verifyToken], controller.submitDay);

  app.post("/api/user/submitImage", [authJwt.verifyToken, upload.single('image')], controller.submitImage);

  app.post("/api/user/getImage", [authJwt.verifyToken], controller.getImage);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
