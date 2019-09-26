const mongoose= require('mongoose');

//database model

const recordSchema= mongoose.Schema({
    
    key:{type:String,required:true},
    createdAt:{type:Date,required:true},
    totalCount:{type:Number,required:true},

});

module.exports=mongoose.model('Record',recordSchema);