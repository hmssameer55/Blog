const mongoose = require("mongoose")

const mongoURL="mongodb+srv://hmssameer55:sRRmwwY3GcmbArqR@cluster0.6ghbz.mongodb.net/blog_website"

const makeDbConnection = async ()=>{
    try{
       await mongoose.connect(mongoURL)
        console.log("connected to DB")
    } catch (err){
        console.log("something went wrong while connecting to db",err)
    }
  mongoose.Promise=global.Promise
}

module.exports=makeDbConnection