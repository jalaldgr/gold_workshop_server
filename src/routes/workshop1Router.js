const express = require("express")
const router = express.Router()
const workshop1Controller = require("../controllers/workshop1Controller")
const orderController = require("../controllers/orderController")


router.post('/login', workshop1Controller.postLogin)
router.get("/get-workshop1/:id",workshop1Controller.getWorkshop1ById)
router.post("/update-workshop1/:id",workshop1Controller.updateWorkshop1ById)
router.get("/get-all-pending-orders/:id/:status/",orderController.getAllPendingOrdersById)
router.post("/complete-order/:id/",orderController.postCompleteOrder)


router.get('/', (req, res) => {
    res.send('workshop1 works functionally')
})


module.exports = router
