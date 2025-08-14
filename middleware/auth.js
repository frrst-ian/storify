function requireOwnership(getResourceFn) {
    return async (req, res, next) => {
        try {
            const resourceId = parseInt(req.params.fileId || req.params.folderId);
            const resource = await getResourceFn(resourceId);

            if (!resource) {
                req.flash('error', 'Resource not found');
                return res.status(404).redirect('/');
            }

            if (resource.userId !== req.user.id) {
                req.flash('error', 'Permission denied');
                return res.status(401).redirect('/');
            }

            req.resource = resource;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    };
}

module.exports = { requireOwnership };