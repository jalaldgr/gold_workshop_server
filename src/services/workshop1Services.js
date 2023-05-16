const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const Workshop1 = db.Workshop1
const secretKey = process.env.JSON_WEBTOKEN_SECRET

module.exports={authenticate,
    create
}
async function authenticate({ username, password }) {
    const workshop1 = await Workshop1.findOne({ username });
    if (workshop1 && bcrypt.compareSync(password, workshop1.hash)) {
        const token = jwt.sign({ sub: workshop1.id }, secretKey, { expiresIn: '7d' });
        return {
            ...workshop1.toJSON(),
            token
        };
    }
}

async function create(userParam) {
    if(userParam) {
        if (await Workshop1.findOne({username: userParam.username})) {
            throw 'Username "' + userParam.username + '" is already taken';
        }

        const user = new Workshop1(userParam);

        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
        // save user
        await user.save();
    }
}
