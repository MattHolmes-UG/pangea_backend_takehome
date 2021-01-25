const express = require("express");
const fs = require("fs");

function routes(dataPath) {
  const router = express.Router();

  router
    .route("/:topic")
    .get((req, res) => {
      const { topic } = req.params;
      fs.readFile(dataPath, (err, json) => {
        const data = JSON.parse(json);
        console.log("the data", data);
        if (err) {
          return res.status(500).json({
            error: true,
            errMsg: `Error occured while trying to get data`
          });
        }
        return res.json({ subscribers: data[topic] ? data[topic] : []});
      });
    })
    .post((req, res) => {
      const { topic } = req.params;
      const { url } = req.body;
      if (!url) {
        return res.status(500).json({
          error: true,
          errMsg: `'url' cannot be undefined or empty string and must be a string`
        });
      }
      // get the subscribers data from json file/db
      // fs.access(dataPath, (err) => {
      //   if (!err) {
      //     console.log("File exists");
      fs.readFile(dataPath, (err, json) => {
        if (err) {
          return res.status(500).json({
            error: true,
            errMsg: `Error occured while trying to get data`
          });
        }
        const data = JSON.parse(json);
        // console.log("the data", data);
        // check if topic already present
        if (data[topic]) {
          // check if url is present under topic
          console.log(
            "topic data",
            data[topic],
            data[topic].some((link) => link === url)
          );
          if (data[topic].some((link) => link === url)) {
            // url already exists for topic
            return res.status(404).json({
              error: true,
              errMsg: `Subscriber with url ${url} already exists for topic '${topic}'`,
            });
          } else {
            data[topic].push(url);
          }
        } else {
          // add the topic
          data[topic] = [url];
        }
        // update the data
        // save
        fs.writeFile(dataPath, JSON.stringify(data), (err) => {
          if (err) {
            return res.status(500).json({
              error: true,
              errMsg: err.message,
            });
          } else {
            return res.status(200).json({
              success: true,
              msg: `Subscriber with url ${url} added successfully to topic '${topic}'`,
            });
          }
        });
      });
      // } else {
      //   console.log("File does not exist");
      // }
      // });
    });

  return router;
}

module.exports = routes;
