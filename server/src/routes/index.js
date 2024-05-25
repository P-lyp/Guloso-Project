const express = require("express");
const path = require("path");
const { getDB, insertDB } = require("../modules/dbModule");

const router = express.Router();

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

module.exports = router;
