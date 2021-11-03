const express = require("express");
const cors = require("cors");
const app = express();
const shortenerRouter = require('./routers/shortener')
const redirect = require('./routers/redirect')

app.use(cors());

app.use('/r', redirect)
app.use('/shorten', shortenerRouter)
// app.use("/public", express.static(`./public`));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

module.exports = app;
