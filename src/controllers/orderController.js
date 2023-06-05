const orderService = require('../services/orderServices');

module.exports = {
    create,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    updateOrderById,
    getAllPendingOrdersById,
    postCompleteOrder
}

function create(req, res, next) {
    orderService.create(req.body,req.files)
        .then(order => res.json(order))
        .catch(err => next(err));

}


function getAllOrders(req,res,next){
    try{
        orderService.getAllOrders()
            .then(designers=>{
                res.send(designers)
            })
    }catch (e) {
        res.send(e)
    }

}
function getOrderById(req,res,next){
    const  id = req.params.id
    if(id){
        try{
            orderService.getOrderById(id)
                .then(designer=>{
                    res.send(designer)
                })
        }catch (e) {
            res.send(e)
        }
    }

}
function deleteOrderById(req,res,next){
    const id=req.params.id
    if(id){
        try{
            orderService.deleteOrderById(id)
                .then(result=>{res.send(result)})
        }catch (e) {
            res.send(e)
        }
    }

}
function updateOrderById(req,res,next){
    const id = req.params.id
    const body = req.body
    if(id && body){
        try{
            orderService.updateOrderById(id,body,req.files)
                .then(result=>{res.send(result)})
        }catch (e) {
            res.send(e)
        }
    }

}


function getAllPendingOrdersById(req,res,next){
    const id = req.params.id
    const status  = req.params.status

    try{
        orderService.getAllPendingOrdersByUserId(id,status)
            .then(orders=>{
                res.send(orders)
            })
    }catch (e) {
        res.send(e)
    }

}

function postCompleteOrder(req,res,next){
    const id = req.params.id

    try{
        orderService.postCompleteOrder(id)
            .then(orders=>{
                res.send("سفارش با موفقیت تکمیل شد")
            })
    }catch (e) {
        res.send(e)
    }

}
