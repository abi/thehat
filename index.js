
var ecstatic = require('ecstatic')(__dirname + '/static');
var fs = require('fs');
var http = require('http');
var Mustache = require('mustache');
var path = require('path');
var router = require('routes')();

router.addRoute('/', function (req, res, params) {
  template(res, 'index.html');
});

router.addRoute('/artist/:artist', function (req, res, params){
  template(res, 'artist.html', {name: params.artist});
});

http.createServer(function (req, res) {
  var m = router.match(req.url);
  if (m) {
    m.fn(req, res, m.params);
  } else {
    console.log(req.url);
    ecstatic(req, res);
  }
}).listen(8888, '127.0.0.1');

console.log('Server running at http://127.0.0.1:8888/');

function template (res, file, context) {
  res.setHeader('Content-Type', 'text/html');
  fs.readFile(path.join(__dirname, 'templates', file), function (err, tmpl){
    if (err) {
      // Right thing to do? TODO: Throw a 500 server error
      res.end(err);
    } else {
      res.end(Mustache.render(tmpl.toString(), context));
    }
  });
}

// var stripe = require("stripe")(
//   "sk_test_KZwIEjraxQBaH37Ao25f3BQn"
// );

// stripe.charges.create({
//   amount: 400,
//   currency: "usd",
//   card: "tok_15SekPFzDXT0mQCaEC4lQ2mT", // obtained with Stripe.js
//   description: "Charge for test@example.com"
// }, function(err, charge) {
//   // asynchronously called
// });
