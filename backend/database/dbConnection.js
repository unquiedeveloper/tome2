import mongoose from "mongoose";


export const dbConnection =()=>{
    mongoose.connect(process.env.MONGO_URL ,{
        dbName:"tasteofmiddleeast"
    }).then(()=>{
        console.log(`connection successfulll!!`);
        
    }).catch((err)=>{
        console.log(`connection failed ${err}`);
        
    })
}


