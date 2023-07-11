const tableService = require('../services/tableServices');
const designerService = require("../services/designerServices");
const orderService = require("../services/orderServices");

module.exports = {getTable,
postTable,
    getTables,
    getTableById,
    postTableById,
    getSearchInAllTables,
    getYesterdayTable
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

function postTableById(req, res, next) {
    const id = req.params.id
    tableService.postTableById(req.body,id)
        .then(table => res.json(table))
        .catch(err => next(err));

}


function getTableById(req,res,next){
    const id = req.params.id
    tableService.getTableById(id)
        .then(table => res.json(table))
        .catch(err => next(err));
}


function getSearchInAllTables(req,res,next){
    const s = req.params.s

    try{
        tableService.getSearchInAllTables(s)
            .then(tables=>{
                res.send(tables)
            })
    }catch (e) {
        res.send(e)
    }

}

function getYesterdayTable(req, res, next) {
    tableService.getYesterdayTable(req.body)
        .then(table => res.json(table))
        .catch(err => next(err));

}
