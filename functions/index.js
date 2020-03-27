const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const app = express();
//middleware
app.use(cors({ origin: true }));
app.use(express.static('./public'));

//Routers
app.use('/api',require('./routers/api'));

//Error Handling middleware

//exposes your Express application so it can be accessed.
exports.app = functions.https.onRequest(app);

//Some notice:
/*
+ must change version of node in folder to meeting with version in locally installed v12

*/