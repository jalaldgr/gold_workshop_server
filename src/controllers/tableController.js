const tableService = require('../services/tableServices');
const designerService = require("../services/designerServices");

module.exports = {getTable,
postTable,
    getTables
}

function getTable(req, res, next) {
    tableService.getTable(req.body)
        .then(table => res.json(table))
        .catch(err => next(err));

}

function postTable(req, res, next) {
    tableService.postTable(req.body)
        .then(table => res.json(table))
        .catch(err => next(err));

}


function getTables(req,res,next){
    try{
        tableService.getAllTables()
            .then(tables=>{
                res.send(tables)
            })
    }catch (e) {
        res.send(e)
    }

}
