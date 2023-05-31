const express = require("express")
const router = express.Router()
const workshop1Controller = require("../controllers/workshop1Controller")


router.post('/login', workshop1Controller.postLogin)
router.get("/get-workshop1/:id",workshop1Controller.getWorkshop1ById)
router.post("/update-workshop1/:id",workshop1Controller.updateWorkshop1ById)

router.get('/', (req, res) => {
    res.send('workshop1 works functionally')
})


module.exports = router
