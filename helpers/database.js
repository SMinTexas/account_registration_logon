const pgp = require("pg-promise")();
const db = pgp("postgres://localhost:5432/registration");

function toArray(commaSeparatedString) {
    return JSON.stringify(commaSeparatedString.split(",").map(i => i.trim()));
}

/**
 * Checks if there is a user with the given email in the database.
 *
 * @param {string} email The email address for the user
 * @returns nothing if there is no user, the user if they exist
 */
function checkForUser(email) {
    return db.oneOrNone(
        "SELECT email, password, id FROM users WHERE email = $1", [email]
    );
}

function createUser(email, password) {
    return db.none("INSERT INTO users (email, password) VALUES ($1, $2)", [
        email,
        password
    ]);
}

module.exports = {
    checkForUser: checkForUser,
    createUser: createUser
};