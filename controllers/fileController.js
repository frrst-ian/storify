const db = require("../db/queries");
const { validationResult } = require("express-validator");
const supabase = require("../config/supabase");


async function getRenameFileForm(req, res) {
    try {
        res.render("file-rename-form", {
            title: "Rename File",
            fileName: req.resource.name,
            fileId: req.resource.id
        })
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }

}

async function postRenameFileForm(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("file-rename-form", {
            errorList: errors.array(),
            title: "Rename File",
            fileName: req.resource.name,
            fileId: req.resource.id
        })
    }

    try {
        const fileName = req.body.fileName;

        await db.updateFileName(fileName, req.resource.id);
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

async function postDeleteFileForm(req, res) {
    try {
        // Delete from Supabase
        const { data, error } = await supabase.storage
            .from('user-files-storify')
            .remove([req.resource.storagePath]);

        if (error) {
            console.error('Supabase deletion error:', error);
            return res.status(500).send('File deletion failed');
        }

        await db.deleteFile(req.resource.id);
        req.flash("success", "File deleted");
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
}

async function getFileDetailsHandler(req, res) {
    const title = "File Details";
    try {
        const file = req.resource;

        const formatFileSize = (Number(file.size) / 1048576).toFixed(2);
        const date = file.createdAt;
        const formatDate = date.toDateString();
        res.render("file-details", {
            title: title,
            fileName: file.name,
            fileSize: formatFileSize,
            fileUploadDate: formatDate,
            fileType: file.fileType,
            user: req.user,
            file: file
        })
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { getRenameFileForm, postRenameFileForm, postDeleteFileForm, getFileDetailsHandler };