const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    clientFullName: { type: String , required: true},
    plateName: { type: String },
    description: { type: String },
    image: { type: String ,default:"placeholder.jpg"},
    code:{type:String},
    weight:{type:String},
    status:{type:String,default:'در انتظار بررسی',},
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
    orderMeta:{type:String},
    woocommerceOrderId:{type:String},
    clientType:{type:String,default:'مشتری'},
    clientMobile:{type:String},
    productType:{type:String,default:'دستبند'},
    deliveryDate:{type:String},
    orderDate:{type:String},
    orderType:{type:String,default:'تلفنی'},
    orderRecipient:{type:String},
    deficiency:{type:String}

});
schema.index({ clientFullName: 'text', productType: 'text', clientMobile: 'text', orderMeta: 'text',orderDate: 'text'});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Order', schema);
