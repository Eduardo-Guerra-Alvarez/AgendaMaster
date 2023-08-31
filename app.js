const express = require("express");
const db = require("./database");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.set('port', process.env.PORT || 4000);

// Middleware
//app.use(bodyParser.urlencoded({extended: false})); // to use x-www-form-urlencoded
//app.use(bodyParser.json()); // to use json

app.use(cors({
    origin: '*'
}))
app.use(express.json());

// Routes
const schedule_routes = require("./routes/schedule.routes");
const participant_routes = require("./routes/participant.routes");

// Routes used
app.use('/api/schedule', schedule_routes);
app.use('/api/participant', participant_routes);

app.get('/', (req, res) => {
    res.send("Hello world");
})


module.exports = app;
