const express = require('express');
const { get } = require('http');

const placeRoutes = require("./routes/placesRoutes");
const menuRoutes = require("./routes/menuRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();

var cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(function(req, res, next) {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	next();
});

app.use('/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/place', placeRoutes);
app.use('/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/menu', menuRoutes);
app.use('/api/v1/8d59e57a-6b8f-4a54-b585-2e2c3edcd3ea/user', userRoutes);

module.exports = app;
