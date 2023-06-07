const tableService = require('../services/tableServices');

module.exports = {getTable,
postTable
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


