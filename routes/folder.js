const { Router } = require("express");
const folderRouter = Router();
const upload = require("../config/upload");
const folderController = require("../controllers/folderController");
const uploadController = require("../controllers/uploadFileController");

folderRouter.get("/:folderId", folderController.getFolderById);
folderRouter.get("/:folderId/upload", uploadController.getUploadFileForm);
folderRouter.post("/:folderId/upload", upload.single('file'), uploadController.postUploadFileForm);

module.exports = folderRouter;