import express from "express";
import db from "../db/conn.mjs";

export async function login(username, password) {
    let collection = await db.collection("users");

    let document = await collection.findOne( { username: username } );

    if ( document == null ) {
        return { status: 404, data: "No account with this username" };
    }

    if ( document.password != password ) {
        return { status: 401, data: "Incorrect password!" };
    }

    delete document._id;

    return { status: 200, data: document };
}

const router = express.Router();

router.post("/", async (req, res) => {
    let loginRes = await login(req.body.username, req.body.password);
    res.status(loginRes.status).send(loginRes.data);
});

export default router;