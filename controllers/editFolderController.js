const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function getEditFolderForm(req, res) {
    const folderId = req.resource.id;

    try {
        res.render("edit-folder-form", {
            title: "Edit Folder",
            folderName: req.resource.name,
            folderId
        })
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function postEditFolderForm(req, res) {
    const errors = validationResult(req);
    const folderName = req.body.folderName;
    const folderId = req.resource.id;

    if (!errors.isEmpty()) {
        return res.status(400).render("edit-folder-form", {
            errorList: errors.array(),
            title: "Edit Folder",
            folderName,
            folderId
        })
    }

    try {
        await db.updateFolderName(folderName, folderId);
        res.redirect("/");
    } catch (error) {
        console.error("Edit Folder Error: ", error);
        let errorMsg = "Something went wrong. Please try again."

        res.status(500).render("edit-folder-form", {
            errorList: [{ msg: errorMsg }],
            title: "Edit Folder"
        })
    }
}

module.exports = { getEditFolderForm, postEditFolderForm };