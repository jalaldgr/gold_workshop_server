const workshop2Service = require('../services/workshop2Services');

module.exports = {postLogin,
    register,
}

function register(req, res, next) {
    workshop2Service.create(req.body)
        .then(() => res.json({}))
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

