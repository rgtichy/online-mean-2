var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'client')));
app.use('/js', express.static(path.join(__dirname, 'bower_components')));

app.listen(8000);
