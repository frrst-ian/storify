const { Router } = require("express");
const folderRouter = Router();
const upload = require("../config/upload");
const folderValidator = require("../validators/folderValidator");
const folderController = require("../controllers/folderController");
const uploadController = require("../controllers/uploadFileController");
const editFolderController = require("../controllers/editFolderController");
const deleteFolderController = require("../controllers/deleteFolderController")

folderRouter.get("/:folderId", folderController.getFolderById);
folderRouter.get("/:folderId/upload", uploadController.getUploadFileForm);
folderRouter.post("/:folderId/upload", upload.single('file'), uploadController.postUploadFileForm);
folderRouter.get("/:folderId/edit", editFolderController.getEditFolderForm);
folderRouter.post("/:folderId/edit", folderValidator, editFolderController.postEditFolderForm);
folderRouter.post("/:folderId/delete", deleteFolderController.postDeleteFolderForm);

module.exports = folderRouter;