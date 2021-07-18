const express = require('express');
const routes = require('./routes');
const app = express();

app.get('/', (req, res) => {
  res.send('Reza Merdeka API')
});

app.use(express.json());
app.use(routes);
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

app.listen(5000,() => console.log('Server is running on port 5000'));
