import express from "express";
import db from "../db/conn.mjs";

const router = express.Router();

router.post("/", async (req, res) => {
    let collection = await db.collection("users");

    let document = await collection.findOne( { username: req.body.username } );

    if ( document == null ) {
        res.status(404).send("No account with this username");
        return;
    }

    if ( document.password != req.body.password ) {
        res.status(401).send("Incorrect password!");
        return;
    }

    delete document._id;

    res.status(200).send(document);
});

export default router;