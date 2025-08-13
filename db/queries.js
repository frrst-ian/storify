const db = require("../db/prisma");

async function createUser(email, fullName, password) {
    return await db.user.create({
        data: {
            email: email,
            fullName: fullName,
            password: password
        }
    })
}

async function getUserByEmail(email) {
    return await db.user.findUnique({
        where: {
            email: email,
        },
    })
}

async function getUserById(id) {
    return await db.user.findUnique({
        where: {
            id: id,
        },
    })
}

async function createFolder(id, name) {
    return await db.folder.create({
        data: {
            name: name,
            userId: id,
        }
    })
}

async function createFile(id, name, fileType, url, size, folderId) {
    return await db.file.create({
        data: {
            name: name,
            fileType: fileType,
            url: url,
            size: size,
            userId: id,
            folderId: folderId

        }
    })
}


async function getFolders(id) {
    return await db.folder.findMany({
        where: {
            userId: id,
        }
    })
}

async function getFiles(id) {
    return await db.file.findMany({
        where: {
            userId: id,
        }
    })
}

async function getFilesInFolder(id, folderId) {
    return await db.file.findMany({
        where: {
            userId: id,
            folderId: folderId,
        }
    })
}

async function getFilesWithoutFolder(id) {
    return await db.file.findMany({
        where: {
            userId: id,
            folderId: null,
        }
    })
}

async function getFolderById(id) {
    return await db.folder.findUnique({
        where: {
            id: id,
        }
    })
}

async function getFileById(id) {
    return await db.file.findUnique({
        where: {
            id: id,
        }
    })
}

async function updateFolderName(name, folderId) {
    return await db.folder.update({
        data: {
            name: name
        },
        where: {
            id: folderId,
        }
    })
}

async function updateFileName(name, fileId) {
    return await db.file.update({
        data: {
            name: name
        },
        where: {
            id: fileId,
        }
    })
}

async function updateFileFolder(folderId, fileId) {
    return await db.file.update({
        data: {
            folderId: folderId
        },
        where: {
            id: fileId
        }
    })
}

async function deleteFolder(folderId) {
    return await db.folder.delete({
        where: {
            id: folderId,
        }
    })
}

async function deleteFile(fileId) {
    return await db.file.delete({
        where: {
            id: fileId,
        }
    })
}

module.exports = {
    createUser, getUserById, getUserByEmail, createFile, createFolder, getFolders, getFiles,
    getFolderById, getFileById, getFilesWithoutFolder, updateFileFolder, updateFolderName, getFilesInFolder,
    deleteFile, deleteFolder, updateFileName
};
