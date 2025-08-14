const db = require("../db/queries");

async function postDeleteFolderForm(req, res) {

    try {
        await db.deleteFolder(req.resource.id);
        req.flash("success", "Folder deleted");
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { postDeleteFolderForm }