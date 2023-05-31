const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    clientFullName: { type: String , required: true},
    plateName: { type: String },
    description: { type: String },
    image: { type: String },
    code:{type:String},
    weight:{type:String},
    status:{type:String,default:'در انتظار بررسی',enum: ['در انتظار بررسی','تکمیل نهایی' , 'در حال طراحی','در کارگاه 1','در کارگاه 2','تکمیل طراحی','تکمیل کارگاه 1','تکمیل کارگاه 2' ,'لغو شده']},
    workshop1fullName:{type:String},
    workshop1Id:{type:String},
    workshop1File:{type:String},
    workshop2fullName:{type:String},
    workshop2Id:{type:String},
    workshop2File:{type:String},
    designerFullName:{type:String},
    designerId:{type:String},
    designerFile:{type:String},
    createdDate: { type: Date, default: Date.now },
    instantDelivery:{type:String},
    customerDelivery:{type:String},
    paperDelivery:{type:String},
    feeOrder:{type:String},
    orderMeta:{metaKey:{type:String},metaValue:String},
    woocommerceOrderId:{type:String},
    clientType:{type:String},
    clientMobile:{type:String},
    productType:{type:String},



});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Order', schema);
