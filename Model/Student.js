var mongoose=require('mongoose');
const triggers=require('mongo-triggers');

const StudentSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Marks:[{
        Subject_Id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:['Subject']
        },
        Marks:{
            type:Number
        },
        Result:{
            type:String
        }
    }],
    isDelete:{
        type:Boolean,
        default:false
    }
});

const Student=mongoose.model("Student",StudentSchema);

module.exports=Student;