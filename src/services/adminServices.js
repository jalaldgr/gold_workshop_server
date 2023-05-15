const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const Admin = db.Admin
const secretKey = process.env.JSON_WEBTOKEN_SECRET

module.exports={authenticate,
    create
}
async function authenticate({ username, password }) {
    const admin = await Admin.findOne({ username });
    if (admin && bcrypt.compareSync(password, admin.hash)) {
        const token = jwt.sign({ sub: admin.id }, secretKey, { expiresIn: '7d' });
        return {
            ...admin.toJSON(),
            token
        };
    }
}

async function create(userParam) {
    if(userParam) {
        if (await Admin.findOne({username: userParam.username})) {
            throw 'Username "' + userParam.username + '" is already taken';
        }

        const user = new Admin(userParam);

        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
        // save user
        await user.save();
    }
}
