const express = require("express");
const router = express.Router();
const adminRouter = require('./admin')
const workshop1Router = require("./workshop1Router")
const workshop2Router = require("./workshop2Router")
const designerRouter = require("./designerRouter")



router.use('/admin',adminRouter)
router.use("/workshop1",workshop1Router)
router.use("/workshop2",workshop2Router)
router.use("/designer",designerRouter)
router.get('/', (req, res) => {
    res.send('server works functionally')
})

module.exports = router
