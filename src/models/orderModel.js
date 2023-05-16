const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    clientFullName: { type: String , required: true},
    plateName: { type: String },
    description: { type: String },
    image: { type: String },
    code:{type:String},
    weight:{type:String},
    status:{type:String,enum: ['pending', 'discarded', 'inDesign','inWorkshop1','inWorkshop2','completed','completeDesign','completeWorkshop1','completeWorkshop2' ]},
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
