const express = require("express")
const router = express.Router()
const workshop2Controller = require("../controllers/workshop2Controller")
const workshop1Controller = require("../controllers/workshop1Controller");


router.post('/login', workshop2Controller.postLogin)
router.get("/get-workshop2/:id",workshop2Controller.getWorkshop2ById)
router.post("/update-workshop2/:id",workshop2Controller.updateWorkshop2ById)

router.get('/', (req, res) => {
    res.send('workshop2 works functionally')
})


module.exports = router
