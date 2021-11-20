const mongoose=require('mongoose');

const Banker=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    passportId:{
        type:String,
        required:true,

    },
    email: {
        type: String,
        required: true,
        match: /^\S+@\S+\.\S+$/
    }
    ,
    cash: {
        type:Number,
        default:0
    },
    credit: {
        type:Number,
        default:0,
        min:[0,`Credit can't be less than 0`]
    }
})

const BankerModel =mongoose.model('BankersData',Banker)

module.exports = {
    BankerModel
}