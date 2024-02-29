import express from "express";
import homepageRouter from "./homepageRouter.js";
import path from "path";

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000;
const publicPath = path.join(path.resolve(), "public");

const app = express();

app.use("/static", express.static(publicPath));
app.use(homepageRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});