const adminService = require('../services/adminServices');

module.exports = {postLogin,
    register,
}

function register(req, res, next) {
    adminService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));

}

function postLogin(req, res, next) {

    adminService.authenticate(req.body)
        .then(admin =>{
            if(!admin){
                // res.status(400).json({ message: 'Username or password is incorrect' })
                return res.send("Username or password is incorrect")
            }

            res.json(admin)
        }).catch(err => next(err));
}

