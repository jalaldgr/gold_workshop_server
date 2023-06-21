const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment'); // require
const schema = new Schema({
    table1:{type:String,default:`{"row":[1],"other":[0],"consumption_load":[0],"consumptions_load_and_other":[0],"after_melt":[0],"difference":[0],"after_paging":[0],"final_difference":[0]}`},
    table2:{type:String,default:`{"row":[0,2,3],"description":["مانده روز قبل","کسر برش","کسر ذوب"],"import":[0,0,0],"export":[0,0,0],"final_balance":[0,0,0],"real_balance":[0,0,0],"balance":[0,0,0],"difference":[0,0,0]}`},
    table3:{type:String,default:`{"description":["متفرقه"],"other":[0],"ring":[0],"wire":[0],"ball":[0],"solder":[0],"chain":[0],"piece_chain":[0],"lock":[0],"work_made":[0],"sum":[0]}`},
    table41:{type:String,default: `{"row":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],"description":["متفرقه","حلقه","مفتول","گوی","لحیم","زنجیر","تکه زنجیر","مدبر","کارساخت","کارساخت","کارساخت","کارساخت","متفرقه","متفرقه","متفرقه","متفرقه","متفرقه","متفرقه","متفرقه","متفرقه","سرسنجاق"],"import_weight":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"summary":["","","","","","","","","","","","","","","","","","","","",""]}`},
    table42:{type:String,default:`{"description":["متفرقه","حلقه","مفتول","گوی","لحیم","زنجیر","تکه زنجیر","مدبر","کارساخت","سرسنجاق"],"real_balance":[0,0,0,0,0,0,0,0,0,0],"system_balance":[0,0,0,0,0,0,0,0,0,0],"difference":[0,0,0,0,0,0,0,0,0,0],"summary":["","","","","","","","","",""]}`},
    table5:{type:String,default:`{"row":[],"client_name":[],"description":[],"code":[],"weight":[],"cut_deficiency":[],"popion_deficiency":[],"jewel_weight":[],"summary":[],"melting":[],"wire_pulling":[],"cut":[],"popion":[],"ring":[],"chain":[],"piece_chain":[],"cane":[],"lock":[],"wire":[],"solder":[],"ball":[],"pin":[],"ring2":[],"half_made":[],"wiring":[],"final_weight":[],"burnish_deficiency":[]}`},
    table6:{type:String,default:`{"daily_melt":0,"burnish_deficiency":0,"melt_deficiency":0,"cut_deficiency":0,"cut_deference":0,"sum":0}`},
    status:{type:String},
    date:{type: String ,}
},{ timestamps: true });
schema.index({ date: 'text'});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Table', schema);
