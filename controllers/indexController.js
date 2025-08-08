async function getIndex(req, res) {
    try {
        res.render("index", {
            user: req.user,
            errorList: req.flash()
        });
    } catch (error) {
        console.error("Index page error:", error);
        res.status(500).render("error", { message: "Server Error" });
    }
}

module.exports = { getIndex };