const migrationsRun = require("./database/sqlite/migrations");

require("express-async-errors");
const cors = require("cors")
const express = require("express");
const routes = require("./routes");

migrationsRun();

const app = express();
app.use(cors())
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
    console.log(`server is running on PORT ${PORT}`)
);