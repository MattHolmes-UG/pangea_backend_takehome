#!/bin/bash

echo "Starting publisher & subscriber servers"

(cd publisher_server && npm run serve) & (cd subscriber_server && npm run serve)