const Record=require('../models/getir');

const Control=require('../middlewares/getir');

//bodyden gelen datayı kontrol edip databasede filtreleme yapan controller

exports.getir_post=(req,res,next)=>{

    try{
        Control.checkParameters(req.body);
        let startDate=new Date(req.body.startDate);
        let endDate=new Date(req.body.endDate);
        let minCount=req.body.minCount;
        let maxCount=req.body.maxCount;
    
        Record.aggregate([
            {
                 $match:{
                 createdAt:{
                     $gte: startDate,
                     $lte: endDate
                 }
                 
         
               }}, 
         
               {$project: 
                 {
                     _id : 0 ,
                     key:"$key",
                 createdAt:"$createdAt",
                 totalCount: { $sum:{ $filter:{
                     input:"$counts",
                     cond: { $and:[{$gte: [{$sum: "$counts"}, minCount ]},{$lte: [{$sum: "$counts"}, maxCount ] }]}   
                 }
             }}
                 
               }}
             
          ]).then(doc=>{
             let records=[];
             for(let object of doc){
                 if(object.totalCount>0)
                 {
                     records.push(object)
                 }
             }
         
             res.status(200).json(Control.createResponse(false,records));
         })
    }
    catch(err){
        res.json(Control.createResponse(true,err));
    }

}