Template.registerHelper("currentPlayer", function() {
  return Players.findOne(Session.get("playerID"));
});

Template.registerHelper("players", function() {
  return Players.findByMostClicked();
});

Template.registerHelper("numberOfPlayers", function() {
  return Players.find({}).count();
});

Template.registerHelper("canShowStartGame", function() {
  return Players.find({}).count() >= 2;
});

Template.registerHelper("playerID", function() {
  return Session.get("playerID");
});

Template.registerHelper("canPlay", function() {
  return Games.canPlay();
});

Template.registerHelper("isFinished", function() {
  return Players.isFinished(Session.get("playerID"));
});

Template.registerHelper("totalOfClicks", function() {
  return Players.clicks(Session.get("playerID"));
});

Template.registerHelper("isWinner", function() {
  return Players.isWinner(Session.get("playerID"));
});

Template.registerHelper("isPlaying", function() {
  return Players.isPlaying(Session.get("playerID"));
});

Template.registerHelper("isWaiting", function() {
  var hasPlayers = !!Players.find({}).count();
  var isNotPlaying = !Players.isPlaying(Session.get("playerID"));
  var isWaiting = Session.get("waiting");
  return isWaiting && isNotPlaying && hasPlayers;
});