const workshop1Service = require('../services/workshop1Services');
const {Workshop1} = require("../helper/db");

module.exports = {postLogin,
    register,
    getAllWorkshop1,
    getWorkshop1ById,
    deleteWorkshop1ById,
    updateWorkshop1ById
}

function register(req, res, next) {
    workshop1Service.create(req.body)
        .then(workshop1 => res.send(workshop1))
        .catch(err => next(err));

}

function postLogin(req, res, next) {

    workshop1Service.authenticate(req.body)
        .then(workshop1 =>{
            if(!workshop1){
                // res.status(400).json({ message: 'Username or password is incorrect' })
                return res.send("Username or password is incorrect")
            }

            res.json(workshop1)
        }).catch(err => next(err));
}
function getAllWorkshop1(req,res,next){
    try{
        workshop1Service.getAllWorkshop1()
            .then(workshop1s=>{
                res.send(workshop1s)
            })
    }catch (e) {
        res.send(e)
    }

}
function getWorkshop1ById(req,res,next){
    const  id = req.params.id
    if(id){
        try{
            workshop1Service.getWorkshopById(id)
                .then(workshop1=>{
                    res.send(workshop1)
                })
        }catch (e) {
            res.send(e)
        }
    }

}
function deleteWorkshop1ById(req,res,next){
    const id=req.params.id
    if(id){
        try{
            workshop1Service.deleteWorkshop1ById(id)
                .then(result=>{res.send(result)})
        }catch (e) {
            res.send(e)
        }
    }

}
function updateWorkshop1ById(req,res,next){
    const id = req.params.id
    const body = req.body
    if(id && body){
        try{
            workshop1Service.updateWorkshop1ById(id,body)
                .then(result=>{res.send(result)})
        }catch (e) {
            res.send(e)
        }
    }

}
