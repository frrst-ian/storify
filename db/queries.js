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

module.exports = { createUser, getUserById, getUserByEmail };
