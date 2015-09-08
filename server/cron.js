Meteor.startup(function() {
  SyncedCron.add({
    name: "Game Play",
    schedule: function(parser) {
      return parser.text("every 1 seconds");
    },
    job: function() {
      if (Games.timeWaiting()) {
        Games.refreshWait();
      } else {
        var gameID = Games.currentID();
        if (Players.hasMoreThanOne(gameID)) {
          if (Games.isRunning()) {
            if (Games.timeElapsed()) {
              Games.refreshGame();
            } else {
              Players.winner();
              Players.finish();
              Games.stopGame();
            } 
          } else {
            Players.start();
            Games.run();
          }
        } else {
          Players.clear();
          Games.stopGame();
        }
      }
    }
  });
});