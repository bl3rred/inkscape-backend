const express = require("express");
const healthRoutes = require("./routes/health");
const stubRoutes = require("./routes/stub");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/api/v1", healthRoutes);
app.use("/api/v1", stubRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
