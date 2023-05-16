const workshop2Service = require('../services/workshop2Services');
const workshop1Service = require("../services/workshop1Services");

module.exports = {postLogin,
    register,
    getAllWorkshop2,
    getWorkshop2ById,
    deleteWorkshop2ById,
    updateWorkshop2ById
}

function register(req, res, next) {
    workshop2Service.create(req.body)
        .then(workshop2 => res.json(workshop2))
        .catch(err => next(err));

}

function postLogin(req, res, next) {

    workshop2Service.authenticate(req.body)
        .then(workshop2 =>{
            if(!workshop2){
                // res.status(400).json({ message: 'Username or password is incorrect' })
                return res.send("Username or password is incorrect")
            }

            res.json(workshop2)
        }).catch(err => next(err));
}

function getAllWorkshop2(req,res,next){
    try{
        workshop2Service.getAllWorkshop2()
            .then(workshop2s=>{
                res.send(workshop2s)
            })
    }catch (e) {
        res.send(e)
    }

}
function getWorkshop2ById(req,res,next){
    const  id = req.params.id
    if(id){
        try{
            workshop2Service.getWorkshop2ById(id)
                .then(workshop2=>{
                    res.send(workshop2)
                })
        }catch (e) {
            res.send(e)
        }
    }

}
function deleteWorkshop2ById(req,res,next){
    const id=req.params.id
    if(id){
        try{
            workshop2Service.deleteWorkshop2ById(id)
                .then(result=>{res.send(result)})
        }catch (e) {
            res.send(e)
        }
    }

}
function updateWorkshop2ById(req,res,next){
    const id = req.params.id
    const body = req.body
    if(id && body){
        try{
            workshop2Service.updateWorkshop2ById(id,body)
                .then(result=>{res.send(result)})
        }catch (e) {
            res.send(e)
        }
    }

}
