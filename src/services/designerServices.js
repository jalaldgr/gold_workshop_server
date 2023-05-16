const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const Designer = db.Designer
const secretKey = process.env.JSON_WEBTOKEN_SECRET

module.exports={authenticate,
    create
}
async function authenticate({ username, password }) {
    const designer = await Designer.findOne({ username });
    if (designer && bcrypt.compareSync(password, designer.hash)) {
        const token = jwt.sign({ sub: designer.id }, secretKey, { expiresIn: '7d' });
        return {
            ...designer.toJSON(),
            token
        };
    }
}

async function create(userParam) {
    if(userParam) {
        if (await Designer.findOne({username: userParam.username})) {
            throw 'Username "' + userParam.username + '" is already taken';
        }

        const user = new Designer(userParam);

        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
        // save user
        await user.save();
    }
}
