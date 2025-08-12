const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const fileValidator = require("../validators/fileValidator");

fileRouter.get("/:fileId/rename", fileController.getRenameFileForm);
fileRouter.post("/:fileId/rename", fileValidator, fileController.postRenameFileForm);

module.exports = fileRouter;