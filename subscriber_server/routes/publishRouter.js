const express = require('express');


function routes() {
  const router = express.Router();

  router.route("/:id")
    .post((req, res) => {
      // print the data received
      console.log(`Message received: ${req.body}`);
      return res.status(200);
    });

  return router;
};

module.exports = routes;