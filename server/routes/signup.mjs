import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
    console.log("Got Signup Request");
    let newDocument = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    console.log(newDocument);

    if (!req.body.username.match('^[A-Za-z0-9]{4,16}$')) {
        res.status(400).send("Username does not match requirements");
        return;
    }

    if (!(req.body.email.match('^[^\s]+[^\s]+\.[^\s]+$') || req.body.email == '' || req.body == null)) {
        res.status(400).send("Email provided but does not match email format");
        return;
    }

    if (req.body.password.match("^[^\s]{8,}$") == null) {
        res.status(400).send("Password does not match requirements");
        return;
    }

    let collection = await db.collection("users");

    if (await collection.findOne({ username: req.body.username })) {
        res.status(409).send("Username already taken");
        return;
    }

    let result = await collection.insertOne(newDocument);

    res.status(204).send(result);
});

export default router;