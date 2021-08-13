const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    }
})

const User=new mongoose.model('User',userSchema);
module.exports=User;
