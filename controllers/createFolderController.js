const db = require("../db/queries");
const { validationResult } = require("express-validator");

async function getFolderForm(req, res) {
    try {
        res.render("folder-form", {
            title: "Create Folder"
        })
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function postFolderForm(req, res) {
    const errors = validationResult(req);
    const userId = req.user.id;
    const folderName = req.body.folderName;

    if (!errors.isEmpty()) {
        return res.status(400).render("folder-form", {
            errorList: errors.array(),
            title: "Create Folder",
            folderName
        })
    }

    try {
        await db.createFolder(userId, folderName);
        res.redirect("/");
    } catch (error) {
        console.error("Create Folder Error: ", error);
        let errorMsg = "Something went wrong. Please try again."

        res.status(500).render("folder-form", {
            errorList: [{ msg: errorMsg }],
            title: "Create Folder"
        })
    }
}

module.exports = { getFolderForm, postFolderForm };