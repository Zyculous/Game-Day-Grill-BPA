import express from "express";
import homepageRouter from "./homepageRouter.js";
import assetsRouter from "./assetsRouter.js";
import path from "path";

import process from "process";

const port = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "public");

const app = express();

app.get("/api/v1/hello", (req, res) => {
    res.json({message: "Hello World!"});
});


app.use("/", express.static(publicPath));
app.use("/src", assetsRouter);
app.use(homepageRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});