Games = new Mongo.Collection("games");

Games.findCurrentGame = function() {
  return this.find({}, {limit: 1, sort: {start: -1}});
};

Games.currentGame = function() {
  var currentGame = this.findCurrentGame().fetch();
  return currentGame && currentGame[0];
};

Games.isRunning = function() {
  return this.currentGame().running;
};

Games.timeElapsed = function() {
  return this.currentGame().timer;
};

Games.canPlay = function() {
  return !this.findCurrentGame().count();
};

Games.refresh = function() {
  this.update({}, {$inc: {timer: -1}, $set: {running: true}}, {multi: true});
};

Games.startGame = function() {
  this.remove({});
  this.insert({timer: TIMER, running: false});
};

Games.stopGame = function() {
  this.remove({});
};