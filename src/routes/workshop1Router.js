const express = require("express")
const router = express.Router()
const workshop1Controller = require("../controllers/workshop1Controller")
const orderController = require("../controllers/orderController")
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
            fileSize: 4096 * 1024
        }
    })

router.post('/login', workshop1Controller.postLogin)
router.get("/get-workshop1/:id",workshop1Controller.getWorkshop1ById)
router.post("/update-workshop1/:id",workshop1Controller.updateWorkshop1ById)
router.get("/get-all-pending-orders/:id/:status/",orderController.getAllPendingOrdersById)
router.post("/complete-order/:id/:status",orderController.postCompleteOrder)
router.post("/send-file/:id/:user/",upload.fields([{name:'workshop1File'}]),orderController.postSendFile)
router.get("/get-all-order",orderController.getAllOrders)



router.get('/', (req, res) => {
    res.send('workshop1 works functionally')
})


module.exports = router
