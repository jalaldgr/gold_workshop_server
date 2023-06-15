const express = require("express")
const router = express.Router()
const controller = require("../controllers/adminController")
const designerController = require("../controllers/designerController")
const workshop1Controller = require("../controllers/workshop1Controller")
const workshop2Controller = require("../controllers/workshop2Controller")
const orderController = require("../controllers/orderController")
const tableController = require("../controllers/tableController")
const multer = require("multer");
const path = require("path");
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
router.post('/login', controller.postLogin)
router.post('/register',controller.register)
router.get("/get/:id",controller.getAdminById)
router.post("/update/:id",controller.updateAdminById)

router.post('/register-workshop1',workshop1Controller.register)
router.get("/get-all-workshop1",workshop1Controller.getAllWorkshop1)
router.get("/get-workshop1/:id",workshop1Controller.getWorkshop1ById)
router.post("/update-workshop1/:id",workshop1Controller.updateWorkshop1ById)
router.delete("/delete-workshop1/:id",workshop1Controller.deleteWorkshop1ById)

router.post('/register-workshop2',workshop2Controller.register)
router.get("/get-all-workshop2",workshop2Controller.getAllWorkshop2)
router.get("/get-workshop2/:id",workshop2Controller.getWorkshop2ById)
router.post("/update-workshop2/:id",workshop2Controller.updateWorkshop2ById)
router.delete("/delete-workshop2/:id",workshop2Controller.deleteWorkshop2ById)

router.post('/register-designer',designerController.register)
router.get("/get-all-designer",designerController.getAllDesigner)
router.get("/get-designer/:id",designerController.getDesignerById)
router.post("/update-designer/:id",designerController.updateDesignerById)
router.delete("/delete-designer/:id",designerController.deleteDesignerById)

router.post('/create-order',upload.fields([{name:'file'},{name:'image'}]),orderController.create)
router.get("/get-all-order",orderController.getAllOrders)
router.get("/get-order/:id",orderController.getOrderById)
router.post("/update-order/:id",upload.fields([{name:'file'},{name:'image'}]),orderController.updateOrderById)
router.delete("/delete-order/:id",orderController.deleteOrderById)
router.get("/get-table/",tableController.getTable)
router.post("/post-table/",tableController.postTable)
router.get("/get-tables/",tableController.getTables)
router.post("/post-table/:id",tableController.postTableById)
router.get("/get-table/:id",tableController.getTableById)

router.get('/', (req, res) => {
    res.send('admin works functionally')
})


module.exports = router
