const express = require("express")
const router = express.Router()
const controller = require("../controllers/adminController")
const designerController = require("../controllers/designerController")
const workshop1Controller = require("../controllers/workshop1Controller")
const workshop2Controller = require("../controllers/workshop2Controller")
const orderController = require("../controllers/orderController")


router.post('/login', controller.postLogin)
router.post('/register',controller.register)
router.post('/register-designer',designerController.register)
router.post('/register-workshop1',workshop1Controller.register)
router.post('/register-workshop2',workshop2Controller.register)
router.post('/create-order',orderController.create)




router.get('/', (req, res) => {
    res.send('admin works functionally')
})


module.exports = router
