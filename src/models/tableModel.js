const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment'); // require
const schema = new Schema({
    table1:{type:String},
    table2:{type:String,default:`{"row":[0,2,3],"description":["مانده روز قبل","کسر برش","کسر ذوب"],"import":[0,0,0],"export":[0,0,0],"final_balance":[0,0,0],"real_balance":[0,0,0],"balance":[0,0,0],"difference":[0,0,0]}`},
    table3:{type:String},
    table41:{type:String,default: `{"row":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"description":["متفرقه","حلقه","مفتول","گوی","لحیم","زنجیر","تکه زنجیر","مدبر","کارساخت","کارساخت","کارساخت","کارساخت","متفرقه","متفرقه","متفرقه","متفرقه","متفرقه","متفرقه","متفرقه","متفرقه","سرسنجاق"],"import_weight":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"summary":["","","","","","","","","","","","","","","","","","","","",""]}`},
    table42:{type:String,default:`{"description":["متفرقه","حلقه","مفتول","گوی","لحیم","زنجیر","تکه زنجیر","مدبر","کارساخت","سرسنجاق"],"real_balance":[0,0,0,0,0,0,0,0,0,0],"system_balance":[0,0,0,0,0,0,0,0,0,0],"difference":[0,0,0,0,0,0,0,0,0,0],"summary":["","","","","","","","","",""]}`},
    table5:{type:String},
    table6:{type:String},
    status:{type:String},
    date:{type: String ,}
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
