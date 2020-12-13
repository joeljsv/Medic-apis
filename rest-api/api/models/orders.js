const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
    qty:{type:Number,default:1}
});

module.exports = mongoose.model('Orders', orderSchema);