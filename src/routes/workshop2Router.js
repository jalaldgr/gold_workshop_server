const express = require("express")
const router = express.Router()
const workshop2Controller = require("../controllers/workshop2Controller")
const workshop1Controller = require("../controllers/workshop1Controller");
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
            fileSize: 4096 * 1024
        }
    })


router.post('/login', workshop2Controller.postLogin)
router.get("/get-workshop2/:id",workshop2Controller.getWorkshop2ById)
router.post("/update-workshop2/:id",workshop2Controller.updateWorkshop2ById)
router.get("/get-all-pending-orders/:id/:status/",orderController.getAllPendingOrdersById)
router.post("/complete-order/:id/",orderController.postCompleteOrder)
router.post("/send-file/:id/:user/",upload.fields([{name:'workshop2File'}]),orderController.postSendFile)
router.get('/', (req, res) => {
    res.send('workshop2 works functionally')
})


module.exports = router
