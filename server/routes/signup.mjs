import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/", async (req, res) => {
    let newDocument = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    };
    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

export default router;