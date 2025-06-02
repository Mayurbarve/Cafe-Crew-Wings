import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://dbchandu:chandu0412@chandu.krlz6pe.mongodb.net/?retryWrites=true&w=majority&appName=Chandu').then(()=>console.log("DB Connected"));
   
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your databse user's password else it will show an error.