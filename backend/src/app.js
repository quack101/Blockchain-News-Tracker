// const express = require("express");
// const cors = require("cors");

// const publish = require("./routes/publish");
// const update = require("./routes/update");
// const history = require("./routes/history");

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/publish", publish);
// app.use("/update", update);
// app.use("/history", history);

// module.exports = app;

const express = require("express");
const cors = require("cors");

const publish = require("./routes/publish");
const update = require("./routes/update");
const history = require("./routes/history");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/publish", publish);
app.use("/update", update);
app.use("/history", history);

// ✅ Debug route (optional)
app.get("/", (req, res) => {
  res.send("API working");
});

module.exports = app;