import mongoose from "mongoose";

const connectDb = ()=>{
    mongoose
  .connect(process.env.MONGO_URI, { dbName: "tododb" })
  .then(() => console.log("database connected successfully"))
  .catch((e) => console.log(e));
}

export default connectDb;