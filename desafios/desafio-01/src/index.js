const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const countRequest = require("./middlewares/countRequests");

const app = express();

app.use(express.json());
app.use(cors());
app.use(countRequest);
app.use(routes);

app.listen(3333, () => {
  console.log("Server running at port 3333");
});
