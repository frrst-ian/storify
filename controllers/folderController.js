const db = require("../db/queries");

async function getFolderById(req, res, next) {
    const folderId = parseInt(req.params.folderId);
    const userId = req.user.id;


    try {
        const folder = await db.getFolderById(folderId);
        if (folder === null) {
            req.flash("error", "Folder doesn't exist");
            return res.status(404).redirect("/");
        }

        if (folder.userId === userId) {
            const filesInFolder = await db.getFilesInFolder(userId, folderId)
            console.log("Files in folder:", filesInFolder);
            console.log("Files count:", filesInFolder.length);
            res.render("folder-files", {
                folder,
                filesInFolder,
                title: "Folder | Storify",
                user: req.user,
                inFolder :true
            })
        } else {
            req.flash("error", "Permission denied");
            return res.status(401).redirect("/");
        }


    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { getFolderById }