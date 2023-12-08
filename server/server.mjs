import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signup from "./routes/signup.mjs";

dotenv.config();

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/signup", signup);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});