Games = new Mongo.Collection("games");

Games.findCurrentGame = function() {
  return this.find({}, {limit: 1});
};

Games.isRunning = function() {
  var game = this.findOne();
  return game && game.r;
};

Games.timeWaiting = function() {
  var game = this.findOne();
  return game && game.w;
};

Games.timeElapsed = function() {
  var game = this.findOne();
  return game && game.t;
};

Games.refreshGame = function() {
  this.update({}, {$inc: {t: -1}, $set: {r: true}}, {multi: true});
};

Games.refreshWait = function() {
  this.update({}, {$inc: {w: -1}}, {multi: true});
};

Games.run = function() {
  this.update({}, {$set: {r: true}}, {multi: true});
};

Games.exists = function() {
  return this.findCurrentGame().count();
}

Games.start = function() {
  this.insert({t: TIMER, w: WAIT, r: false});
};

Games.stopGame = function() {
  this.remove({});
};