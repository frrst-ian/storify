const { Router } = require("express");
const downloadFileRouter = Router();
const downloadFileController = require("../controllers/downloadFileController");
const { requireOwnership } = require('../middleware/auth');
const db = require('../db/queries');
downloadFileRouter.get("/:fileId", requireOwnership(db.getFileById), downloadFileController.downloadFile);

module.exports = downloadFileRouter;