import express from "express";
import db from "../db/conn.mjs";
import { login } from "./login.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post("/getReservations", async (req, res) => {
    let loginRes = await login(req.body.username, req.body.password);

    if (loginRes.status != 200) {
        res.status(loginRes.status).send(loginRes.data);
        return;
    }

    let collection = await db.collection("reservations");

    let query = await collection.find({ username: req.body.username });

    let reservations = [];

    for await (const doc of query) {
        reservations.push(doc);
    }

    res.status(200).send(reservations);
});

router.post("/createReservation", async (req, res) => {
    let loginRes = await login(req.body.username, req.body.password);

    if (loginRes.status != 200) {
        res.status(loginRes.status).send(loginRes.data);
        return;
    }

    let newDocument = {
        username: req.body.username,
        name: req.body.name,
        date: req.body.date,
        people: req.body.people,
        location: req.body.location
    };

    let collection = await db.collection("reservations");

    let result = await collection.insertOne(newDocument);

    res.status(204).send(result);
});

router.post("/deleteReservation", async (req, res) => {
    let loginRes = await login(req.body.username, req.body.password);

    if (loginRes.status != 200) {
        res.status(loginRes.status).send(loginRes.data);
        return;
    }

    let collection = await db.collection("reservations");

    let query = { _id: new ObjectId(req.body._id )};

    let result = await collection.deleteOne(query);

    res.status(200).send(result);
});

export default router;