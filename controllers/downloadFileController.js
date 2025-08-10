const db = require("../db/queries");
const path = require('path');


async function downloadFile(req, res, next) {
    const fileId = parseInt(req.params.fileId);
    const userId = req.user.id;
    try {
        const file = await db.getFileById(fileId);
        if (file == null) {
            req.flash('error', "File not found");
            return res.status(404).redirect("/");
        }
        const filePath = path.join(__dirname, '..', 'public', file.url);

        if (file.userId === userId) {
            res.download(filePath);
        } else {
            req.flash('error', "Permission denied");
            return res.status(401).redirect("/");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { downloadFile };