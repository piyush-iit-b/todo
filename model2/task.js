const mongoose=require("mongoose");
const scema=mongoose.Schema;

const taskscema=new scema({
    name:
    {
        type:String,
        required:true,
    },
     description:
    {
        type:String,
        required:true,
    },
    username:
    {
        type:String,
        required:true,
    }
})
module.exports=mongoose.model("task",taskscema);