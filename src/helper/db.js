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
    Admin: require('../models/admin'),
    Designer:require('../models/designer'),
    Workshop1:require('../models/workshop1'),
    Workshop2:require('../models/workshop2'),
    Order:require('../models/order')




};

