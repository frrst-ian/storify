const db = require("../db/queries");
const supabase = require("../config/supabase");

async function postDeleteFolderForm(req, res) {
    const userId = req.user.id;

    try {
        const filesInFolder = await db.getFilesInFolder(userId, req.resource.id);

        // Delete each file in the folder
        for (const file of filesInFolder) {
            // Delete from Supabase
            const { data, error } = await supabase.storage
                .from('user-files-storify')
                .remove([req.resource.storagePath]);

            if (error) {
                console.error('Supabase deletion error:', error);
                return res.status(500).send('File deletion failed');
            }

            // Delete from database
            await db.deleteFile(file.id);
        }

        // Finally delete the folder
        await db.deleteFolder(req.resource.id);

        req.flash("success", "Folder deleted");
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = { postDeleteFolderForm }