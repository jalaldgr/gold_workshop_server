const mongoose = require('mongoose');
const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
mongoose.connect(process.env.MONGODB_URI, {});
mongoose.Promise = global.Promise;
module.exports = {
    Admin: require('../models/adminModel'),
    Designer:require('../models/designerModel'),
    Workshop1:require('../models/workshop1Model'),
    Workshop2:require('../models/workshop2Model'),
    Order:require('../models/orderModel')




};

