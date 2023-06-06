const tableService = require('../services/tableServices');

module.exports = {getTable,

}

function getTable(req, res, next) {
    tableService.getTable(req.body)
        .then(table => res.json(table))
        .catch(err => next(err));

}

