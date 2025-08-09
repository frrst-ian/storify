const { Router } = require("express");
const uploadFileRouter = Router();
const uploadFileController = require("../controllers/uploadFileController");
const upload = require("../config/upload");

uploadFileRouter.get("/", uploadFileController.getUploadFileForm);
uploadFileRouter.post("/", upload.single('file'), uploadFileController.postUploadFileForm);

module.exports = uploadFileRouter;