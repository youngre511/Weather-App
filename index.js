const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");

// MIDDLEWARE //
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));

// ROUTER //
const indexRouter = require("./routes/indexRouter");
app.use("/", indexRouter);

// PORT //
const PORT = 10000;
app.listen(PORT, () => console.log(`server listening at port ${PORT}`));
