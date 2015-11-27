module.exports = function (app) {
 var api = '/api/';
 var data = '/../data/';
 var jsonfileservice = require('../utils/jsonfileservice')();
 var four0four = require('../utils/404')();

 app.get(api + 'player/:id', getPlayer);
 app.get(api + 'players', getPlayers);

 app.get(api + '*', four0four.notFoundMiddleware);

 function getPlayer(req, res, next) {
  //var id = req.params.id;
  var id = req.params.id;
  var msg = 'player id ' + id + ' not found. ';
  try {
   var json = jsonfileservice.getJsonFromFile(data + 'players.json');
   var player = json.filter(function (c) {
    return c.id === parseInt(id);
   });
   if (player && player[0]) {
    res.send(player[0]);
   } else {
    four0four.send404(req, res, msg);
   }
  } catch (ex) {
   four0four.send404(req, res, msg + ex.message);
  }
 }

 function getPlayers(req, res, next) {
  var msg = 'players not found. ';
  try {
   var json = jsonfileservice.getJsonFromFile(data + 'players.json');
   if (json) {
    res.send(json);
   } else {
    four0four.send404(req, req, msg);
   }
  } catch (ex) {
   four0four.send404(req, res, msg + ex.message);
  }
 }
};