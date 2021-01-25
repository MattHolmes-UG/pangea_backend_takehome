const express = require("express");
const fs = require('fs');
const axios = require('axios');

function routes(dataPath) {
  const router = express.Router();

  router.route("/:topic").post((req, res) => {
    const { topic } = req.params;
    const { body } = req;
    if (!body) {
      return res.status(404).json({
        error: true,
        errMsg: `Invalid Request. Body cannot be empty or undefined`,
      });
    }
    const dataToPublish = {topic, data: body};
    fs.readFile(dataPath, (err, json) => {
      if (err) {
        return res.status(500).json({
          error: true,
          errMsg: `Error occured while trying to get data`,
        });
      }
      const data = JSON.parse(json);
      const successful = []; // To hold the details of successfully published to url
      const failed = [];
      console.log(dataToPublish);
      if (data[topic]) {
        console.log('data exists');
        data[topic].forEach((url) => {
          console.log('url', url);
          axios
            .post(url, dataToPublish)
            .then((response) => {
              console.log('response', response);
              if (response.status === 200) successful.push({url, status: response.status, data: response.data});
              else failed.push({
                url,
                status: response.status,
                data: response.data,
              });
            })
            .catch((error) => {
              console.log(error);
              failed.push({
                url,
                status: 500,
                data: error,
              });
            });
        });
      }
      return res.status(200).json({
        success: true,
        msg: "Message published successfully.",
        noOfSubscribers: data[topic] ? data[topic].length : 0,
        failed,
        successful,
        topic,
        publishedMsg: dataToPublish,
      });
    });
  });

  return router;
}

module.exports = routes;
