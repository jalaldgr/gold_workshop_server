const express = require("express")
const router = express.Router()
const designerController = require("../controllers/designerController")


router.post('/login', designerController.postLogin)
router.get("/get-designer/:id",designerController.getDesignerById)
router.post("/update-designer/:id",designerController.updateDesignerById)


router.get('/', (req, res) => {
    res.send('designer works functionally')
})


module.exports = router
