import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./configs/connectDB.js";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [process.env.CLIENT],
    credentials: true, // Allow credentials for cross-origin requests
  })
);

app.use(morgan("dev"));
app.use(express.json());

//test karva mate route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} and http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

start();
