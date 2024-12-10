const mongoose =require("mongoose");
require('dotenv').config();


const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');
        
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
    
};

//function insert a docs in DB the logique
module.exports = connectDB;