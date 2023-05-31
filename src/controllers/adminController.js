const adminService = require('../services/adminServices');

module.exports = {postLogin,
    getAdminById,
    register,
    updateAdminById
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
function getAdminById(req,res,next) {
    const id = req.params.id
    if (id) {
        try {
            adminService.getAdminById(id)
                .then(Admin => {
                    res.send(Admin)
                })
        } catch (e) {
            res.send(e)
        }
    }
}

function updateAdminById(req, res, next) {
    console.log(req.body)
    const id = req.params.id
    const body = req.body
    if (id && body) {
        try {
            adminService.updateAdminById(id, body)
                .then(result => {
                    res.send(result)
                })
        } catch (e) {
            res.send(e)
        }
    }

}
