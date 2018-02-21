var mongoose=require('mongoose');

const SubjectSchema=new mongoose.Schema({
    Subject_Name:{
        type:String
    },
    isDelete:{
        type:Boolean,
        default:false
    }
});

const Subject=mongoose.model("Subject",SubjectSchema);

module.exports=Subject;