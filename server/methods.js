Meteor.methods({
  enterGame: function(name) {
    check(name, String);
    name = name.toUpperCase().trim();
    if (!name.length) {
      throw new Meteor.Error(412, "Nome em branco");
    } else if (Players.findOne({name: name})) {
      throw new Meteor.Error(412, "Este nome já existe, tente um novo nome");
    } else if (!Games.canPlay()) {
      throw new Meteor.Error(412, "Aguarde o próximo jogo!");
    } else {
      return Players.create(name);
    }
  },
  replayGame: function(_id) {
    check(_id, String);
    Players.replay(_id);
  },
  startGame: function() {
    Players.start();
    Games.startGame();
    SyncedCron.start();
  },
  cancelWaitGame: function(_id) {
    check(_id, String);
    Players.remove({_id: _id});
  },
  clearGame: function() {
    SyncedCron.pause();
    Players.remove({});
    Games.remove({});
  },
  clickClickClick: function(_id) {
    check(_id, String);
    Players.click(_id);
  }
});