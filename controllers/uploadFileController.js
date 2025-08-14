const db = require("../db/queries");
const supabase = require("../config/supabase");

async function getUploadFileForm(req, res, next) {
    try {
        const folderId = parseInt(req.params.folderId) || null;

        res.render("upload-file-form", {
            title: "Upload File",
            folderId

        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function postUploadFileForm(req, res, next) {
    try {
        const file = req.file;
        const folderId = req.params.folderId ? parseInt(req.params.folderId) : null;

        if (!file) {
            return res.render("upload-file-form", {
                errorList: [{ msg: "File Empty" }],
                title: "Upload File",
                folderId
            })
        }
        const { originalname, size, mimetype} = file;
        const { data, error } = await supabase.storage
            .from('user-files-storify')
            .upload(originalname, req.file.buffer);
        if (error) {
            console.error('Supabase upload error:', error);
            return res.status(500).send('Upload failed');
        }
        const supabaseUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/user-files-storify/${originalname}`;

        const userId = req.user.id;
        await db.createFile(
            userId,
            originalname,
            mimetype,
            supabaseUrl,
            size,
            folderId
        );
        const redirectUrl = folderId ? `/folder/${folderId}` : "/";
        res.redirect(redirectUrl)

    } catch (error) {
        console.error("Upload file error:", error);
        let errorMsg = "Something went wrong. Please try again.";

        res.status(500).render("upload-file-form", {
            errorList: [{ msg: errorMsg }],
            title: "Upload File",
        });
    }
}

module.exports = { getUploadFileForm, postUploadFileForm }