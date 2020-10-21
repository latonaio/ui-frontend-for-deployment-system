const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
    console.log('app server start');
});