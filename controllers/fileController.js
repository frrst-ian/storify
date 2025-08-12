const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function getRenameFileForm(req, res) {
    const fileId = parseInt(req.params.fileId);
    const userId = req.user.id

    try {
        const file = await db.getFileById(fileId);

        if (file === null) {
            req.flash("error", "Folder doesn't exist");
            return res.status(404).redirect("/");
        }

        if (file.userId === userId) {
            res.render("file-rename-form", {
                title: "Rename File",
                fileName: file.name,
                fileId
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

}

async function postRenameFileForm(req, res) {
    const errors = validationResult(req);
    const fileName = req.body.fileName;
    const fileId = parseInt(req.params.fileId);

    if(!errors.isEmpty()){
        return res.status(400).render("file-rename-form", {
            errorList : errors.array(),
            title:"Rename File",
            fileName,
            fileId
        })
    }

    try {
        await db.updateFileName(fileName,fileId);
        res.redirect("/")
    } catch (err) {
        console.error(err);
        let errorMsg = "Something went wrong. Please try again."

        res.status(500).render("rename-file-form", {
            errorList: [{ msg: errorMsg }],
            title: "Rename File"
        })
    }
}

module.exports = { getRenameFileForm, postRenameFileForm };