import mongoose from "mongoose";
const connectDB = async () => {
  try {
    // MongoDB connection string
    const uri = process.env.MONGODB_URI;

    // Connect to MongoDB
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      //   useFindAndModify: false,
      //   useCreateIndex: true,
    });

    console.log("Connected to the MongoDB database");
  } catch (error) {
    console.error("Error connecting to the MongoDB database:", error);
    process.exit(1);
  }
};

export default connectDB;
