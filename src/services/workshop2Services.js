const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const Workshop2 = db.Workshop2
const secretKey = process.env.JSON_WEBTOKEN_SECRET

module.exports={authenticate,
    create
}
async function authenticate({ username, password }) {
    const workshop2 = await Workshop2.findOne({ username });
    if (workshop2 && bcrypt.compareSync(password, workshop2.hash)) {
        const token = jwt.sign({ sub: workshop2.id }, secretKey, { expiresIn: '7d' });
        return {
            ...workshop2.toJSON(),
            token
        };
    }
}

async function create(userParam) {
    if(userParam) {
        if (await Workshop2.findOne({username: userParam.username})) {
            throw 'Username "' + userParam.username + '" is already taken';
        }

        const user = new Workshop2(userParam);

        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
        // save user
        await user.save();
    }
}
