Games = new Mongo.Collection("games");

Games.findCurrentGame = function() {
  return this.find({}, {limit: 1, sort: {d: -1}});
};

Games.currentID = function() {
  var game = this.findOne();
  return game && game._id;
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

Games.start = function() {
  if (this.find({f: true}).count()) {
    this.remove({});
  }
  var gameID = this.currentID();
  if (!gameID) {
    gameID = this.insert({t: TIMER, w: WAIT, r: false, f: false, d: new Date()});
    SyncedCron.start();
  }
  return gameID;
};

Games.stopGame = function() {
  this.update({}, {$set: {f: true}}, {multi: true});
  SyncedCron.pause();
};