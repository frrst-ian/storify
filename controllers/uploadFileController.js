const db = require("../db/queries");

async function getUploadFileForm(req, res, next) {
    try {
        res.render("upload-file-form", {
            title: "Upload File"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function postUploadFileForm(req, res, next) {
    try {
        const file = req.file;
        if (!file) {
            return res.render("upload-file-form", {
                errorList: [{ msg: "File Empty" }],
                title: "Upload File",
            })
        }
        const { originalname, size, mimetype, filename } = file;

        console.log("file ", req.file);
        const userId = req.user.id;

        await db.createFile(
            userId,
            originalname,
            mimetype,
            `/uploads/${filename}`,
            size,
            null
        );
        res.redirect("/")

    } catch (error) {
        console.error("Upload file error:", error);
        let errorMsg = "Something went wrong. Please try again.";

        res.status(500).render("upload-file-form", {
            errorList: [{ msg: errorMsg }],
            title: "Upload File",
        });
    }
}

module.exports = { getUploadFileForm, postUploadFileForm }