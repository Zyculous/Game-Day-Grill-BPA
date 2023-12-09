import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import signup from "./routes/signup.mjs";
import login from "./routes/login.mjs";
import reservations from "./routes/reservations.mjs";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/signup", signup);
app.use("/login", login);
app.use("/reservations", reservations);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});