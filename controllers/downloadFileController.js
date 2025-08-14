const db = require("../db/queries");
const { pipeline } = require('stream/promises');

async function downloadFile(req, res, next) {
    const fileId = parseInt(req.params.fileId);
    const userId = req.user.id;
    try {
        const file = await db.getFileById(fileId);
        if (file == null) {
            req.flash('error', "File not found");
            return res.status(404).redirect("/");
        }

        if (file.userId !== userId) {

            req.flash('error', "Permission denied");
            return res.status(401).redirect("/");
        }

        const response = await fetch(file.url);

        res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        // Stream file to user
        await pipeline(response.body, res);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { downloadFile };