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
    updateOrderById,
    getAllPendingOrdersByUserId,
    postCompleteOrder,
    postSendFile,
    getAllActiveOrders,
    getSearchInAllOrders,
    getNotCompletedOrders
}


async function create(userParam,userFiles) {
    try{
        if(userParam) {
            clean(userParam)
            const order = new Order(userParam);
            if(userFiles['image'])order.image=userFiles['image'][0]['filename'];
            return await order.save();
        }
    }catch (e) {
        return e
    }


    function clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined ||obj[propName]==="") {
                delete obj[propName];
            }
        }
        return obj
    }
}


async function getAllOrders() {
    try{
        return await Order.find().sort({"createdDate":-1})
    }catch (e) {
        return e
    }

}
async function getOrderById(id) {
    try{
        return await Order.findOne({_id:id}).sort({"createdDate":-1})
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
async function updateOrderById(id,userParam,userFiles) {

    try{
        if(userParam) {
            clean(userParam)
            const order = await Order.findById(id)
            Object.assign(order, userParam)

            if(userFiles['image'])order.image=userFiles['image'][0]['filename'];
            order.save();
        }
    }catch (e) {
        return e
    }


    function clean(obj) {
        for (var propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined ||obj[propName]==="") {
                delete obj[propName];
            }
        }
        return obj
    }


}


async function getAllPendingOrdersByUserId(id,status) {
    try{
        return await Order.find({$or:[{workshop1Id: id},{workshop2Id:id},{designerId:id}],$and:[{ status:status } ] }).sort({"createdDate":-1})

    }catch (e) {
        return e
    }

}

async function postCompleteOrder(id,status) {
    try{
        const order = await Order.findById(id);
        // validate
        if (!order) throw 'Trip not found';

        // copy userParam properties to user
        Object.assign(order, {status:status});

        await order.save()
    }catch (e) {
        return e
    }

}

async function postSendFile(id,user,files) {
    try{
        if(id) {
            const order = await Order.findById(id)
            if(files['workshop1File'])order.workshop1File=files['workshop1File'][0]['filename'];
            if(files['workshop2File'])order.workshop2File=files['workshop2File'][0]['filename'];
            if(files['designerFile'])order.designerFile=files['designerFile'][0]['filename'];

            order.save();
        }
    }catch (e) {
        return e
    }

}

async function getAllActiveOrders() {
    try{
        return await Order.find({status:'ارسال به کارگاه'}).sort({"createdDate":-1})

    }catch (e) {
        return e
    }

}

async function getSearchInAllOrders(s) {
    try{
        return await Order.find( { $text: { $search: s } } ).sort({"createdDate":-1})
    }catch (e) {
        return e
    }

}

async function getNotCompletedOrders() {
    try{
        return await Order.find({ status:{$ne:"تکمیل نهایی"} }).sort({"createdDate":-1})

    }catch (e) {
        return e
    }

}
