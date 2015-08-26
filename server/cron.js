SyncedCron.add({
  name: "Game Play",
  schedule: function(parser) {
    return parser.text("every 1 seconds");
  },
  job: function() {
    if (Games.timeElapsed()) {
      Games.refresh();
    } else {
      Players.winner();
      Players.finish();
      Games.stopGame();
      SyncedCron.pause();
    }
  }
});