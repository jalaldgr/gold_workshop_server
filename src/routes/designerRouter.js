const express = require("express")
const router = express.Router()
const designerController = require("../controllers/designerController")
const orderController = require("../controllers/orderController");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+"-"+file.originalname)
    }
})
const upload = multer(
    { storage: storage ,
        fileFilter: function (req, file, callback) {
            // var ext = path.extname(file.originalname);
            // if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            //     return callback(new Error('Only images are allowed'))
            // }
            callback(null, true)
        },
        limits:{
            fileSize: 10240 * 1024
        }
    })


router.post('/login', designerController.postLogin)
router.get("/get-designer/:id",designerController.getDesignerById)
router.post("/update-designer/:id",designerController.updateDesignerById)
router.get("/get-all-pending-orders/:id/:status/",orderController.getAllPendingOrdersById)
router.post("/complete-order/:id/:status",orderController.postCompleteOrder)
router.post("/send-file/:id/:user/",upload.fields([{name:'designerFile'}]),orderController.postSendFile)
router.get("/get-all-order",orderController.getAllOrders)
router.post("/update-order-cut-deficiency/:id/:value",designerController.updateDesignerOrderCutDeficiency)

router.get('/', (req, res) => {
    res.send('designer works functionally')
})


module.exports = router
