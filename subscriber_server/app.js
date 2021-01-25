const express = require('express');
const logger = require('morgan');
const debug = require('debug')('app');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http);

const port = process.env.PORT || 8000;

// Routers
const publishRouter = require('./routes/publishRouter')();

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/", publishRouter);

http.listen(port, () => {
  debug(`listening on port ${port}`);
});