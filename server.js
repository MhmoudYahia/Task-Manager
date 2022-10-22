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

//connecting database
const connectDB = require("./DB/connectdb");

// get the env secrit DATA
require("dotenv").config();

//add routes to our server
const tasks = require("./controllers/routes/tasks-route");
app.use("/api/v1/tasks", tasks);

const start = async () => {
  try {
    await connectDB(process.env.URL_CONNECT);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
