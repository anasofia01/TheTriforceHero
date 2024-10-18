const express = require('express');
const cors = require('cors');

const app = express(); // Creates HTTP server
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips
const path = require('path');

const clientPlayerPath = path.resolve(__dirname, '../client-player');
const clientTvPath = path.resolve(__dirname, '../client-tv');
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// Serve Client App 1
app.use('/app1', express.static(clientPlayerPath));

// Serve Client App 2
app.use('/app2', express.static(clientTvPath));

// Catch-all route for Client App 1
app.get('/app1/*', (req, res) => {
	res.sendFile(path.join(clientPlayerPath, 'index.html'));
});

// Catch-all route for Client App 2
app.get('/app2/*', (req, res) => {
	res.sendFile(path.join(clientTvPath, 'index.html'));
});

app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando correctamente!');
});


const usersRouter = require('./routes/users');

app.use('/', usersRouter);

module.exports = app;
