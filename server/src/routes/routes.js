import express from "express";
import path from "path";
import { getDB, insertDB } from "../modules/dbModule.js";

export const router = express.Router();

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const filePath = path.join(__dirname, "../public/app.html");
    res.sendFile(filePath);
});

router.get("/data", async (req, res) => {
    const data = await getDB();
    res.send(data);
});

router.post("/data", async (req, res) => {
    const data = req.body;
    await insertDB(data);
});
