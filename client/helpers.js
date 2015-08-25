Template.registerHelper("currentPlayer", function() {
  return Players.findOne(Session.get("playerID"));
});

Template.registerHelper("players", function() {
  return Players.findByMostClicked();
});

Template.registerHelper("numberOfPlayers", function() {
  return Players.find({}).count();
});

Template.registerHelper("playerID", function() {
  return Session.get("playerID");
});