const db = require("../db/queries");

async function getFolderById(req, res, next) {
    const userId = req.user.id;

    try {

        const filesInFolder = await db.getFilesInFolder(userId, req.resource.id)
        res.render("folder-files", {
            folder:req.resource,
            filesInFolder,
            title: "Folder | Storify",
            user: req.user,
            inFolder: true
        })

    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { getFolderById }