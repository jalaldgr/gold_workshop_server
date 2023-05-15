const express = require("express")
const router = express.Router()
const controller = require("../controllers/adminController")


router.post('/login', controller.postLogin)
router.post('/register',controller.register)


router.get('/', (req, res) => {
    res.send('admin works functionally')
})


module.exports = router
