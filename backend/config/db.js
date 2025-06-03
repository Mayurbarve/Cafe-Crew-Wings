import mongoose from "mongoose";

export const connectDB = async () => {

    await mongoose.connect(`${process.env.MONGODB_URL}//?retryWrites=true&w=majority&appName=Chandu`).then(() => console.log("DB Connected"));
}

// add your mongoDB connection string above.
