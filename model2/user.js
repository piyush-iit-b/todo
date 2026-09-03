const mongoose=require("mongoose");
const scema=mongoose.Schema;
const userscema=new scema({
    name:
    {
        type:String,
        required:true,
    },
     password:
    {
        type:String,
        required:true,
    }
})
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
    }
})
module.exports=mongoose.model("user",userscema);