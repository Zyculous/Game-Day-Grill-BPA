import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
    router.post("/", async (req, res) => {
        let newDocument = {
            name: req.body.name,
            password: req.body.password
        };
        let collection = await db.collection("users");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    });
});

export default router;