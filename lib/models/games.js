Games = new Mongo.Collection("games");

Games.findCurrentGame = function() {
  return this.find({}, {limit: 1});
};

Games.isRunning = function() {
  return this.findOne().r;
};

Games.timeElapsed = function() {
  return this.findOne().t;
};

Games.canPlay = function() {
  return !this.findOne();
};

Games.refresh = function() {
  this.update({}, {$inc: {t: -1}, $set: {r: true}}, {multi: true});
};

Games.startGame = function() {
  this.remove({});
  this.insert({t: TIMER, r: false});
};

Games.stopGame = function() {
  this.remove({});
};