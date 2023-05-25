const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const Workshop2 = db.Workshop2
const secretKey = process.env.JSON_WEBTOKEN_SECRET

module.exports={authenticate,
    create,
    getAllWorkshop2,
    getWorkshop2ById,
    deleteWorkshop2ById,
    updateWorkshop2ById
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
        return await user.save();
    }
}
async function getAllWorkshop2() {
    try{
        return await Workshop2.find()
    }catch (e) {
        return e
    }

}
async function getWorkshop2ById(id) {
    try{
        return await Workshop2.findOne({_id:id})
    }catch (e) {
        return e
    }
}
async function deleteWorkshop2ById(id) {
    try{
        return await Workshop2.findByIdAndRemove(id)
    }catch (e){
        return e
    }
}
async function updateWorkshop2ById(id,params) {
    try{
        const user = await Workshop2.findById(id)
        if(user){
            if (params.password) {
                user.hash = bcrypt.hashSync(params.password, 10);
            }
            Object.assign(user, params)
            await user.save()
            return await user
        }
    }catch (e) {
        return e
    }

}
