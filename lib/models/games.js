Games = new Mongo.Collection("games");

Games.findCurrentGame = function() {
  return this.find({}, {limit: 1});
};

Games.isRunning = function() {
  return this.findOne().running;
};

Games.timeElapsed = function() {
  return this.findOne().timer;
};

Games.canPlay = function() {
  return !this.findOne();
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