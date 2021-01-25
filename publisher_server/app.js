const express = require('express');
const logger = require('morgan');
const debug = require('debug')('app');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require('http').Server(app);

const port = process.env.PORT || 8000;
const subscriberDataPath = path.join(__dirname, 'subscribers.json');

// Routers
const publishRouter = require("./routes/publishRouter")(subscriberDataPath);
const subscriberRouter = require("./routes/subscriberRouter")(
  subscriberDataPath
);

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/publish", publishRouter);
app.use("/subscribe", subscriberRouter);

app.get('/', (req, res) => {
  res.send('Hi');
});

http.listen(port, () => {
  debug(`listening on port ${port}`);
});