const { Router } = require("express");
const folderRouter = Router();
const upload = require("../config/upload");
const folderValidator = require("../validators/folderValidator");
const folderController = require("../controllers/folderController");
const uploadController = require("../controllers/uploadFileController");
const editFolderController = require("../controllers/editFolderController");
const deleteFolderController = require("../controllers/deleteFolderController");
const fileController = require("../controllers/fileController");
const fileValidator = require("../validators/fileValidator");
const moveFileValidator = require("../validators/moveFileValidator");
const { requireOwnership } = require('../middleware/auth');
const db = require('../db/queries');

folderRouter.get("/:folderId", requireOwnership(db.getFolderById), folderController.getFolderById);
folderRouter.get("/:folderId/upload", requireOwnership(db.getFolderById), uploadController.getUploadFileForm);
folderRouter.post("/:folderId/upload", upload.single('file'), requireOwnership(db.getFolderById), uploadController.postUploadFileForm);
folderRouter.get("/:folderId/edit", requireOwnership(db.getFolderById), editFolderController.getEditFolderForm);
folderRouter.post("/:folderId/edit", folderValidator, requireOwnership(db.getFolderById), editFolderController.postEditFolderForm);
folderRouter.post("/:folderId/delete", requireOwnership(db.getFolderById), deleteFolderController.postDeleteFolderForm);
folderRouter.get("/:folderId/file/:fileId", requireOwnership(db.getFileById), fileController.getFileDetailsHandler);
folderRouter.get("/:folderId/file/:fileId/rename", requireOwnership(db.getFileById), fileController.getRenameFileForm);
folderRouter.post("/:folderId/file/:fileId/rename", fileValidator, requireOwnership(db.getFileById), fileController.postRenameFileForm);
folderRouter.post("/:folderId/file/:fileId/delete", requireOwnership(db.getFileById), fileController.postDeleteFileForm);
folderRouter.get("/:folderId/file/:fileId/move", requireOwnership(db.getFileById), fileController.getMoveFileForm);
folderRouter.post("/:folderId/file/:fileId/move", moveFileValidator, requireOwnership(db.getFileById), fileController.postMoveFileForm);

module.exports = folderRouter;