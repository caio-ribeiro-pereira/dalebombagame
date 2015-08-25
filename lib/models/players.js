Players = new Mongo.Collection("players");

Players.isPlaying = function(_id) {
  var player = this.findOne(_id, {fields: {playing: 1}});
  return player && player.playing;
};

Players.isWinner = function(_id) {
  var player = this.findOne(_id, {fields: {winner: 1}});
  return player && player.winner;
};

Players.isFinished = function(_id) {
  var player = this.findOne(_id, {fields: {finished: 1}});
  return player && player.finished;
};

Players.clicks = function(_id) {
  var player = this.findOne(_id, {fields: {clicks: 1}});
  return player && player.clicks;
};

Players.replay = function(_id) {
  this.update(
    { _id: _id }, 
    {
      $set: {
        clicks: 0, 
        playing: false, 
        finished: false,
        winner: false
      }
    }
  );
};

Players.create = function(name) {
  return this.insert({
    name: name, 
    clicks: 0, 
    playing: false, 
    finished: false,
    winner: false
  });
};

Players.click = function(_id) {
  return this.update({_id: _id}, {$inc: {clicks: 1}});
};

Players.start = function() {
  this.update({}, {$set: {playing: true, finished: false}}, {multi: true});
};

Players.finish = function() {
  this.update({}, {$set: {playing: false, finished: true}}, {multi: true});
};

Players.winner = function() {
  var winners = this.find({}, {limit: 1, sort: {clicks: -1}}).fetch()[0];
  this.update({_id: winners._id}, {$set: {winner: true}});
};

Players.findByMostClicked = function() {
  return this.find({}, {sort: {clicks: -1, name: 1}, fields: {name: 1, clicks: 1}});
};