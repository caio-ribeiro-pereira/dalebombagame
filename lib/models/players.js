Players = new Mongo.Collection("players");

Players.hasMoreThanOne = function(gameID) {
  return this.find({g: gameID}).count() >= 2;
};

Players.isPlaying = function(_id) {
  var player = this.findOne(_id, {fields: {p: 1}});
  return player && player.p;
};

Players.isWinner = function(_id) {
  var player = this.findOne(_id, {fields: {w: 1}});
  return player && player.w;
};

Players.isFinished = function(_id) {
  var player = this.findOne(_id, {fields: {f: 1}});
  return player && player.f;
};

Players.clicks = function(_id) {
  var player = this.findOne(_id, {fields: {c: 1}});
  return player && player.c;
};

Players.clear = function() {
  this.remove({});
};

Players.replay = function(_id, gameID) {
  this.update(
    { _id: _id }, 
    { $set: {c: 0, g: gameID, p: false, f: false, w: false}}
  );
};

Players.create = function(name, gameID) {
  return this.insert({name: name, g: gameID, c: 0, p: false, f: false, w: false});
};

Players.click = function(_id) {
  return this.update({_id: _id}, {$inc: {c: 1}});
};

Players.start = function() {
  this.update({}, {$set: {p: true, f: false}}, {multi: true});
};

Players.finish = function() {
  this.update({}, {$set: {p: false, f: true}}, {multi: true});
};

Players.winner = function() {
  var winners = this.find({}, {limit: 1, sort: {c: -1}});
  var _id = winners && winners.fetch()[0]._id;
  this.update({_id: _id}, {$set: {w: true}});
};

Players.findByMostClicked = function(gameID) {
  return this.find({g: gameID}, {sort: {c: -1, name: 1}});
};