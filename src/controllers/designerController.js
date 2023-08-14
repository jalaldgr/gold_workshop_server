const designerService = require('../services/designerServices');

module.exports = {postLogin,
    register,
    getAllDesigner,
    getDesignerById,
    deleteDesignerById,
    updateDesignerById,
    updateDesignerOrderCutDeficiency
}

function register(req, res, next) {
    designerService.create(req.body)
        .then(designer => res.json(designer))
        .catch(err => next(err));

}

function postLogin(req, res, next) {

    designerService.authenticate(req.body)
        .then(designer =>{
            if(!designer){
                // res.status(400).json({ message: 'Username or password is incorrect' })
                return res.send("Username or password is incorrect")
            }

            res.json(designer)
        }).catch(err => next(err));
}

function getAllDesigner(req,res,next){
    try{
        designerService.getAllDesigner()
            .then(designers=>{
                res.send(designers)
            })
    }catch (e) {
        res.send(e)
    }

}
function getDesignerById(req,res,next){
    const  id = req.params.id
    if(id){
        try{
            designerService.getDesignerById(id)
                .then(designer=>{
                    res.send(designer)
                })
        }catch (e) {
            res.send(e)
        }
    }

}
function deleteDesignerById(req,res,next){
    const id=req.params.id
    if(id){
        try{
            designerService.deleteDesignerById(id)
                .then(result=>{res.send(result)})
        }catch (e) {
            res.send(e)
        }
    }

}
function updateDesignerById(req,res,next){
    const id = req.params.id
    const body = req.body
    if(id && body){
        try{
            designerService.updateDesignerById(id,body)
                .then(result=>{res.send(result)})
        }catch (e) {
            res.send(e)
        }
    }

}

function updateDesignerOrderCutDeficiency(req,res,next){
    const id = req.params.id
    const value = req.params.value

    if(id && value){
        try{
            designerService.updateDesignerOrderCutDeficiency(id,value)
                .then(result=>{res.send(result)})
        }catch (e) {
            res.send(e)
        }
    }

}
