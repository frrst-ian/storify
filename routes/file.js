const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const fileValidator = require("../validators/fileValidator");
const { requireOwnership } = require('../middleware/auth');
const db = require('../db/queries');

fileRouter.get("/:fileId/rename", requireOwnership(db.getFileById), fileController.getRenameFileForm);
fileRouter.get("/:fileId", requireOwnership(db.getFileById), fileController.getFileDetailsHandler);
fileRouter.post("/:fileId/rename", fileValidator, requireOwnership(db.getFileById), fileController.postRenameFileForm);
fileRouter.post("/:fileId/delete", requireOwnership(db.getFileById), fileController.postDeleteFileForm);

module.exports = fileRouter;