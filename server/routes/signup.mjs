import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

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
        res.send("Username does not match requirements").status(400);
        return;
    }

    if (!(req.body.email.match('^[^\s]+[^\s]+\.[^\s]+$') || req.body.email == '' || req.body == null)) {
        res.send("Email provided but does not match email format").status(400);
        return;
    }

    if (req.body.password.match("^[^\s]{8,}$") == null) {
        res.send("Password does not match requirements").status(400);
        return;
    }

    let collection = await db.collection("users");

    if (await collection.findOne({ username: req.body.username })) {
        res.send("Username already taken").status(409);
        return;
    }

    let result = await collection.insertOne(newDocument);

    res.send(result).status(204);
});

export default router;