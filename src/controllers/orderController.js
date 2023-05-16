const roderService = require('../services/orderServices');

module.exports = {
    create
}

function create(req, res, next) {
    roderService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));

}

