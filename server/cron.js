SyncedCron.add({
  name: "Game Play",
  schedule: function(parser) {
    return parser.text("every 1 seconds");
  },
  job: function() {
    if (Games.timeWaiting()) {
      Games.refreshWait();
    } else {
      if (Players.hasMoreThanOne()) {
        if (Games.isRunning()) {
          if (Games.timeElapsed()) {
            Games.refreshGame();
          } else {
            Players.winner();
            Players.finish();
            Games.stopGame();
            SyncedCron.pause();
          } 
        } else {
          Players.start();
          Games.run();
        }
      } else {
        Players.clear();
        Games.stopGame();
        SyncedCron.pause();
      }
    }
  }
});