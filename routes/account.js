const express = require("express");
const db = require("../helpers/database");
const router = express.Router();

function checkIsLoggedIn(req, res, next) {
    if (req.session.user_id) {
        next();
    } else {
        res.redirect("/login"); // ("/register")
    }
}

router.use(checkIsLoggedIn);

router.get("/", (req, res) => {
    res.render("account");
});

module.exports = router;