const mongoose=require('mongoose');
require('dotenv').config();
const dbUrl= `${process.env.MONGO_URL}/${process.env.DB_NAME}`
console.log("url:",dbUrl);

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(dbUrl);
        console.info(`connected to MongoDB:${conn.connection.host}`);
    }
    catch(error){
        console.error("Error connecting to MongoDB!",error.message);
        process.exit(1);
    }
}
module.exports=connectDB;