const express = require("express");
const router = express.Router();
const adminRouter = require('./admin')


router.use('/admin',adminRouter)
router.get('/', (req, res) => {
    res.send('server works functionally')
})

module.exports = router
