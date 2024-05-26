import express from "express";
import { fetchTables } from "../modules/dbModule.js";

export const router = express.Router();

router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

router.get("/data", async (req, res) => {
    const data = await fetchTables();
    res.send(data);
});

// router.post("/data", async (req, res) => {
//     const data = req.body;
//     await insertDB(data);
// });
