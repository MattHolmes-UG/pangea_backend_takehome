const express = require('express');
const logger = require('morgan');
// const { config, engine } = require('express-edge');
const compression = require('compression');
const debug = require('debug')('app');
const session = require("express-session");
const flash = require("connect-flash");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http);

const port = process.env.PORT || 8000;

// Routers
const publishRouter = require('./routes/publishRouter')();

// config({ cache: process.env.NODE_ENV === "production" });
// app.use(function (req, res, next) {
//   res.io = io;
//   next();
// });
app.use(cors());
app.use(compression());
// app.use(express.static("public"));
// app.use(engine);
// app.set("views", `${__dirname}/views`);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/", publishRouter);

http.listen(port, () => {
  debug(`listening on port ${port}`);
});