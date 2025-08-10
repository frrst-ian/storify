const { Router } = require("express");
const downloadFileRouter = Router();
const downloadFileController = require("../controllers/downloadFileController");

downloadFileRouter.get("/:fileId", downloadFileController.downloadFile);

module.exports = downloadFileRouter;