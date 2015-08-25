Games = new Mongo.Collection("games");

Games.canPlay = function() {
  return !this.find({}).count();
};

Games.startGame = function() {
  var expires = moment().add(1, "minutes").toDate();
  this.remove({});
  this.insert({expires: expires});
};

Games.stopGame = function() {
  this.remove({});
};