const adminService = require('../services/adminServices');

module.exports = {
    register,
}

function register(req, res, next) {
    adminService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));

}

