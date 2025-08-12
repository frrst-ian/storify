const db = require("../db/queries");

async function postDeleteFolderForm(req, res) {
    const folderId = parseInt(req.params.folderId);
    const userId = req.user.id;

    try {
        const folder = await db.getFolderById(folderId);
        if (folder === null) {
            req.flash("error", "Folder doesn't exist");
            return res.status(404).redirect("/");
        }
        if (folder.userId === userId) {
            await db.deleteFolder(folderId);
            req.flash("success", "Folder deleted");
            res.redirect("/");
        } else {
            req.flash("error", "Permission denied");
            return res.status(401).redirect("/");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { postDeleteFolderForm }