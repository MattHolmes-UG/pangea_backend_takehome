const express = require('express');
const logger = require('morgan');
// const { config, engine } = require('express-edge');
// const compression = require('compression');
const debug = require('debug')('app');
// const session = require("express-session");
// const flash = require("connect-flash");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http);

const port = process.env.PORT || 8000;
const subscriberDataPath = path.join(__dirname, 'subscribers.json');

// Routers
const publishRouter = require("./routes/publishRouter")(subscriberDataPath);
const subscriberRouter = require("./routes/subscriberRouter")(
  subscriberDataPath
);

// config({ cache: process.env.NODE_ENV === "production" });
// app.use(function (req, res, next) {
//   res.io = io;
//   next();
// });
app.use(cors());
// app.use(compression());
// app.use(express.static("public"));
// app.use(engine);
// app.set("views", `${__dirname}/views`);
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