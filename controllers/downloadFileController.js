async function downloadFile(req, res, next) {
    try {
        const response = await fetch(req.resource.url);

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.status}`);
        }

        const contentType = response.headers.get('content-type') || 'application/octet-stream';
        const contentLength = response.headers.get('content-length');

        const encodedFilename = encodeURIComponent(req.resource.name);
        res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodedFilename}`);
        res.setHeader('Content-Type', contentType);

        if (contentLength) {
            res.setHeader('Content-Length', contentLength);
        }

        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Pragma', 'no-cache');

        await pipeline(response.body, res);

    } catch (error) {
        console.error('Download error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Download failed' });
        }
    }
}

module.exports = { downloadFile }