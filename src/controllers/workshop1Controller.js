const workshop1Service = require('../services/workshop1Services');

module.exports = {postLogin,
    register,
}

function register(req, res, next) {
    workshop1Service.create(req.body)
        .then(() => res.json({}))
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

