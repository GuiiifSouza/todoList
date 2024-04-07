require('dotenv').config();

const rateLimit = require("express-rate-limit");
const express = require('express');
const morgan = require('morgan');
const moment = require('moment');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

// Log requests to access.log
const logDate = moment().format('YYYY-MM-DD');
const logFileName = `access-${logDate}.log`;
const logFilePath = path.join(__dirname, 'logs', logFileName);

const accessLogStream = fs.createWriteStream(logFilePath, { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

// Ports and URLs from .env file
const { GATEWAY_PORT, BACKEND_API_URL, FRONTEND_URL } = process.env;

// Redirect to API
app.use('/api', async (req, res) => {
  try {
    const result = await axios({
      method: req.method,
      url: `${BACKEND_API_URL}${req.originalUrl}`,
      data: req.body,
    });
    res.send(result.data);
    res.status(result.status);
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data : 'Error occurred';
    res.status(status).send(message);
  }
});

// Redirect to Frontend
app.use('/*', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${FRONTEND_URL}${req.originalUrl}`,
      data: req.body,
      responseType: 'stream'
    });
    res.set(response.headers);

    response.data.pipe(res);
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data : 'Error occurred';
    res.status(status).send(message);
  }
});

app.listen(GATEWAY_PORT, () => console.log('Gateway API running on port:' + GATEWAY_PORT));

