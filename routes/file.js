const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const fileValidator = require("../validators/fileValidator");

fileRouter.get("/:fileId/rename", fileController.getRenameFileForm);
fileRouter.get("/:fileId", fileController.getFileDetailsHandler);
fileRouter.post("/:fileId/rename", fileValidator, fileController.postRenameFileForm);
fileRouter.post("/:fileId/delete", fileController.postDeleteFileForm);


module.exports = fileRouter;