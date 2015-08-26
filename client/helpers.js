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

Template.registerHelper("timeElapsed", function() {
  return Games.timeElapsed();
});

Template.registerHelper("isGameNotRunning", function() {
  return !Games.isRunning();
});

Template.registerHelper("isFinished", function() {
  return Players.isFinished(Session.get("playerID"));
});

Template.registerHelper("totalOfClicks", function() {
  var clicks = Players.clicks(Session.get("playerID"));
  Session.set("clicks", clicks);
  return clicks;
});

Template.registerHelper("clickStatus", function() {
  var clicks = Session.get("clicks");
  if (clicks <= 15) {
    return "DALE BOMBA!";
  } else if (clicks > 15 && clicks <= 30) {
    return "BOA! MUITO TOPZ!";
  } else if (clicks > 30 && clicks <= 60) {
    return "UNBELIVABLOUW!!!";
  } else if (clicks > 60 && clicks <= 90) {
    return "MUY LOKOOOO!!!";
  } else if (clicks > 90 && clicks <= 120) {
    return "TOLE BOMBA! DALE BOMBA!!";
  } else if (clicks > 120 && clicks <= 150) {
    return "DEDINHO NERVOSO HEIN!!";
  } else if (clicks > 150 && clicks <= 180) {
    return "NIVEL CARANGUEJEIRA!!";
  } else {
    return "ABSURDAMENTE TOPZ!!";
  }
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