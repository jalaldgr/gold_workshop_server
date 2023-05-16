const express = require("express")
const router = express.Router()
const workshop1Controller = require("../controllers/workshop1Controller")


router.post('/login', workshop1Controller.postLogin)


router.get('/', (req, res) => {
    res.send('workshop1 works functionally')
})


module.exports = router
