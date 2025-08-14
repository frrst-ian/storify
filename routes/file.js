const { Router } = require("express");
const fileRouter = Router();
const fileController = require("../controllers/fileController");
const fileValidator = require("../validators/fileValidator");
const moveFileValidator = require("../validators/moveFileValidator");

const { requireOwnership } = require('../middleware/auth');
const db = require('../db/queries');

fileRouter.get("/:fileId/rename", requireOwnership(db.getFileById), fileController.getRenameFileForm);
fileRouter.get("/:fileId", requireOwnership(db.getFileById), fileController.getFileDetailsHandler);
fileRouter.post("/:fileId/rename", fileValidator, requireOwnership(db.getFileById), fileController.postRenameFileForm);
fileRouter.post("/:fileId/delete", requireOwnership(db.getFileById), fileController.postDeleteFileForm);
fileRouter.get("/:fileId/move", requireOwnership(db.getFileById), fileController.getMoveFileForm);
fileRouter.post("/:fileId/move", moveFileValidator, requireOwnership(db.getFileById), fileController.postMoveFileForm);

module.exports = fileRouter;