const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment'); // require
const schema = new Schema({
    table1:{type:String},
    table2:{type:String},
    table3:{type:String},
    table4:{type:String},
    table5:{type:String},
    table6:{type:String},
    status:{type:String},
    createdDate:{type: Date ,default: Date.now()}
},{ timestamps: true });

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Table', schema);
