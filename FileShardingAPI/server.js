var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
port = process.env.PORT || 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//importing route
var routes = require('./api/routes/fileshardingRoutes'); 

//register the route
routes(app); 

app.listen(port);

console.log('server started on: '+port);


