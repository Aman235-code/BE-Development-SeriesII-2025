import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import userRoute from "./routes/user.js";
import bodyParser from "body-parser";
const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server is listening to port 3000");
});
