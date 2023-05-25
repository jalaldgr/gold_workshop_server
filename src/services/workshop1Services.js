const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const Workshop1 = db.Workshop1
const secretKey = process.env.JSON_WEBTOKEN_SECRET

module.exports={authenticate,
    create,
    getAllWorkshop1,
    getWorkshopById,
    deleteWorkshop1ById,
    updateWorkshop1ById
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
        return await user.save();
    }
}
async function getAllWorkshop1() {
    try{
        return await Workshop1.find()
    }catch (e) {
        return e
    }

}
async function getWorkshopById(id) {
    try{
        return await Workshop1.findOne({_id:id})
    }catch (e) {
        return e
    }
}
async function deleteWorkshop1ById(id) {
    try{
       return await Workshop1.findByIdAndRemove(id)
    }catch (e){
        return e
    }
}
async function updateWorkshop1ById(id,params) {
    try{
        const user = await Workshop1.findById(id)
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
