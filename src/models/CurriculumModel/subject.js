const mongoose=require("mongoose");
const {Schema}=require('mongoose');


// ######################## Subject Schema #####################
const subjectSchema=new Schema({
    subjectname:String,
    subjectTopics : [{
        topicId : 
        {
            type : Schema.Types.ObjectId,
            ref : "Topic"
        } 
    }] ,
    gradeId:{
        type:Schema.Types.ObjectId,
        ref: "Grade"
    }
},{
    timestamps:true
    })

const subjectModel=mongoose.model("subject",subjectSchema);
module.exports=subjectModel;