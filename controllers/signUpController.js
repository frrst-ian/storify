async function getSignUp(req, res, next) {
    try {

        res.render("sign-up");
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

async function postSignUp(req, res, next) {
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}