import express from "express";
import { fetchTables } from "../modules/dbModule.js";

export const router = express.Router();

router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

router.get("/data", async (req, res) => {
    const data = await fetchTables();
    res.send(data);
});

// router.post("/data", async (req, res) => {
//     const data = req.body;
//     await insertDB(data);
// });
