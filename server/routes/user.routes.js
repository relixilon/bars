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

  app.post("/api/user/getDay", [authJwt.verifyToken], controller.getDay);
  app.post("/api/user/submitDay", [authJwt.verifyToken], controller.submitDay);
  app.post("/api/user/submitImage", [authJwt.verifyToken, upload.single('image')], controller.submitImage);
  app.post("/api/user/deleteImage", [authJwt.verifyToken], controller.deleteImage);
  app.get("/api/user/getUser", [authJwt.verifyToken], controller.getUser);
  app.get("/api/user/getImages/", [authJwt.verifyToken], controller.getImages);
  app.get("/api/user/getImage/", [authJwt.verifyToken], controller.getImage);
  app.get("/api/user/loginStatus", [authJwt.verifyToken], controller.loginStatus);
  app.get("/api/user/dashboard", [authJwt.verifyToken], controller.getDashboard);
};
