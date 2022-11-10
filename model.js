const mongoose=require('mongoose');


const User=mongoose.Schema({
      id:{
           type:String,
           required:true
          },
      product_Name:{
           type:String,
           required:true
          },
      cost:{
            type:Number,
            required:true
           },
      color:{
            type:String
            },
      availability:{
            type:Object
            },
      quantity:{
            type:Number
            },
       rating:{
            type:Number
            },
       seller:{
            type:String
            }
            })
    
    
        module.exports =mongoose.model('User',User);