const bcrypt = require("bcrypt")

function match(passwordIn, passwordDB) {
    const cocok = bcrypt.compareSync(passwordIn, passwordDB)
    return cocok
}

module.exports = match