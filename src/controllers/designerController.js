const designerService = require('../services/designerServices');

module.exports = {postLogin,
    register,
}

function register(req, res, next) {
    designerService.create(req.body)
        .then(() => res.json({}))
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

