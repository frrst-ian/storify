const db = require("../db/queries");

async function getIndex(req, res) {

    if (!req.user) {
        return res.render("index", {
            user: req.user,
            errorList: req.flash(),
            title: "Home | Storify"
        });

    }

    try {
        const userId = req.user.id;
        const files = await db.getFiles(userId);
        const folders = await db.getFolders(userId);
        const filesWithoutFolder = await db.getFilesWithoutFolder(userId);

        res.render("index", {
            user: req.user,
            folders,
            files,
            filesWithoutFolder,
            errorList: req.flash(),
            title: "Home | Storify"
        });

    } catch (error) {
        console.error("Index page error:", error);
        let errorMsg = "Something went wrong. Please try again.";

        res.status(500).render("index", {
            errorList: [{ errorMsg }]
        });
        // Not implemented
        // res.status(500).render("error", { message: "Server Error" });

    }
}

module.exports = { getIndex };