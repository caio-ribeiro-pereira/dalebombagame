Meteor.methods({
  enterGame: function(name) {
    check(name, String);
    name = name.toUpperCase().trim();
    if (Players.findOne({name: name})) {
      throw new Meteor.Error(412, "Este nome já existe, tente um novo nome");
    } else if (!Games.canPlay()) {
      throw new Meteor.Error(412, "Aguarde o próximo jogo!");
    } else {
      return Players.insert({
        name: name, 
        clicks: 0, 
        playing: false, 
        finished: false,
        winner: false
      });
    }
  },
  replayGame: function(_id) {
    check(_id, String);
    Players.replay(_id);
  },
  stopGame: function() {
    var winner = Players.getWinner();
    Players.update({_id: winner._id}, {$set: {winner: true}});
    Players.update({}, {$set: {playing: false, finished: true}}, {multi: true});
    Games.stopGame();
  },
  startGame: function() {
    Players.update({}, {$set: {playing: true, finished: false}}, {multi: true});
    Games.startGame();
  },
  clearGame: function() {
    Players.remove({});
    Games.remove({});
  },
  clickClickClick: function(_id) {
    check(_id, String);
    Players.update({_id: _id}, {$inc: {clicks: 1}});
  }
});