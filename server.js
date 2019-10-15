//Install express server
const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');

const locale = process.env.LOCALE;

app.use(compression());

// Serve only the static files from the dist directory
const env = process.env.NODE_ENV || 'development';
var forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

// app.configure(function () {
if (env === 'production') {
  console.log("Inside Production");
  app.use(forceSsl);
}
// other configurations etc for express go here...
// });



app.use(express.static(__dirname + '/dist/' + locale));

// app.get('*', function (req, res, next) {
//   console.log("It's a get *");
//   if (req.headers['x-forwarded-proto'] != 'https') {
//     res.redirect('https://' + req.headers.host + req.url);
//   } else next()
// })

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/' + locale + '/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
console.log('Server started');
