const { Router } = require("express");
const createFolderRouter = Router();
const createFolderController = require("../controllers/createFolderController");
const folderValidator = require("../validators/folderValidator");

createFolderRouter.get("/", createFolderController.getFolderForm)
createFolderRouter.post("/", folderValidator, createFolderController.postFolderForm);

module.exports = createFolderRouter;