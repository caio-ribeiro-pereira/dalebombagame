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
  Players.update(
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

Players.getWinner = function() {
  var winners = Players.find({}, {limit: 1, sort: {clicks: -1}}).fetch();
  return winners && winners[0];
};

Players.findByMostClicked = function() {
  return this.find({}, {sort: {clicks: -1, name: 1}});
};