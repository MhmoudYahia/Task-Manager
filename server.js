const express = require("express");

const app = express();

const port = 1443;

app.use(express.static("./FrontPart"));

//dependences
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

//add routes to our server
const tasks = require("./controllers/routes/tasks-route");
app.use('/api/v1/tasks', tasks);

app.listen(port, console.log(`server is listening on port ${port}`));
