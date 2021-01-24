const express = require('express');


function routes() {
  const router = express.Router();

  router.route('/:topic').post((req, res) => {
    const { topic } = req.params;
    const {body: dataToPublish} = req;
    
  });

  return router;
};

module.exports = routes;