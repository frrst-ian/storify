const db = require("../db/queries");
const { pipeline } = require('stream/promises');

async function downloadFile(req, res, next) {
    try {
        const response = await fetch(req.resource.url);

        res.setHeader('Content-Disposition', `attachment; filename="${req.resource.name}"`);
        res.setHeader('Content-Type', 'application/octet-stream');

        // Stream file to user
        await pipeline(response.body, res);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { downloadFile };