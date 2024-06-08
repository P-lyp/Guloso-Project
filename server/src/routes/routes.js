import express from "express";
import { selectTables } from "../modules/dbModule.js";

export const router = express.Router();

router.get("/data", async (req, res) => {
    const data = await selectTables();
    res.send(data);
});

// router.post("/data", async (req, res) => {
//     const data = req.body;
//     await insertDB(data);
// });
