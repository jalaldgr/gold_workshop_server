const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const Order = db.Order
const secretKey = process.env.JSON_WEBTOKEN_SECRET

module.exports={
    create
}


async function create(userParam) {
    if(userParam) {
        if (await Order.findOne({username: userParam.username})) {
            throw 'Username "' + userParam.username + '" is already taken';
        }

        const user = new Order(userParam);

        // hash password
        if (userParam.password) {
            user.hash = bcrypt.hashSync(userParam.password, 10);
        }
        // save user
        await user.save();
    }
}
