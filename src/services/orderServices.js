const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helper/db');
const Order = db.Order
const secretKey = process.env.JSON_WEBTOKEN_SECRET

module.exports={
    create,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    updateOrderById
}


async function create(userParam,userFiles) {
    try{
        if(userParam) {
            const order = new Order(userParam);
            if(userFiles['image'])order.image=userFiles['image'][0]['filename'];
            return await order.save();
        }
    }catch (e) {
        return e
    }

}


async function getAllOrders() {
    try{
        return await Order.find()
    }catch (e) {
        return e
    }

}
async function getOrderById(id) {
    try{
        return await Order.findOne({_id:id})
    }catch (e) {
        return e
    }
}
async function deleteOrderById(id) {
    try{
        return await Order.findByIdAndRemove(id)
    }catch (e){
        return e
    }
}
async function updateOrderById(id,params) {
    try{
        const order = await Order.findById(id)
        if(order){
            Object.assign(order, params)
            await order.save()
            return await order
        }
    }catch (e) {
        return e
    }

}
