const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const userTodoSchema=new Schema({
    user_ID:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    todo:[{
        task:{
            type:String,
        }
    }]
})

const UserTodo=new mongoose.model('UserTodo',userTodoSchema);
module.exports=UserTodo;
