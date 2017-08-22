const path = require('path');
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));

// // Serve the built client
// app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('/index.html'));
});

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
  const index = path.resolve(__dirname + '/../client/dist', 'index.html');
  res.sendFile(index);
});

app.listen(process.env.PORT, function() {
  console.log('App running on port', process.env.PORT);
});
