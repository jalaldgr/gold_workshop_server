const express = require("express")
const router = express.Router()
const workshop2Controller = require("../controllers/workshop2Controller")


router.post('/login', workshop2Controller.postLogin)


router.get('/', (req, res) => {
    res.send('workshop2 works functionally')
})


module.exports = router
