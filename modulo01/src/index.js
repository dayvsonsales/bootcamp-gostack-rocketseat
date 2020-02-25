const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  return res.json({ error: false, msg: "test route" });
});

app.use((_req, res) => {
  return res.json({ error: true, msg: "Not found!" });
});

app.listen(3000, () => {});
