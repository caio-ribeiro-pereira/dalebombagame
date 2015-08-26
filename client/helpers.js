Template.registerHelper("players", function() {
  return Players.findByMostClicked();
});

Template.registerHelper("numberOfPlayers", function() {
  return Players.find({}).count();
});

Template.registerHelper("playerID", function() {
  return Session.get("playerID");
});

Template.registerHelper("playerHighlight", function(_id) {
  return Session.get("playerID") === _id ? "balanced" : "dark";
});

Template.registerHelper("timeElapsed", function() {
  return Games.timeElapsed();
});

Template.registerHelper("timeWaiting", function() {
  return Games.timeWaiting();
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
  if (clicks <= 10) {
    return "DALE BOMBA!";
  } else if (clicks > 10 && clicks <= 20) {
    return "BOA! MUITO TOPZ!";
  } else if (clicks > 20 && clicks <= 30) {
    return "UNBELIVABLOUW!!!";
  } else if (clicks > 30 && clicks <= 40) {
    return "MUY LOKOOOO!!!";
  } else if (clicks > 40 && clicks <= 50) {
    return "TOLE BOMBA! DALE BOMBA!!";
  } else if (clicks > 50 && clicks <= 60) {
    return "XESSUIIISSS!!";
  } else if (clicks > 60 && clicks <= 70) {
    return "PORRAAAANNNN!!";
  } else if (clicks > 70 && clicks <= 80) {
    return "QUE ISSSUUUUU!! o_O";
  } else if (clicks > 80 && clicks <= 90) {
    return "VAI PERDER O DEDO! kkkkk";
  } else if (clicks > 90 && clicks <= 100) {
    return "DEDINHO NERVOSO HEIN!!";
  } else if (clicks > 100 && clicks <= 110) {
    return "SERA QUE GANHA??";
  } else if (clicks > 110 && clicks <= 120) {
    return "JÁ CONSEGUI MAIS QUE ISSO!! :P";
  } else if (clicks > 120 && clicks <= 130) {
    return "SEU FRACO, VAI PERDER!! HAHAHA";
  } else if (clicks > 130 && clicks <= 140) {
    return "É MENTIRA, VC TA INDO BEM! :D";
  } else if (clicks > 140 && clicks <= 150) {
    return "NÃO PARA, NÃO PARA, NÃO PARA, NÃO!";
  } else if (clicks > 150 && clicks <= 160) {
    return "ACHO QUE VOCÊ ESTA FICANDO LOUCO!!";
  } else if (clicks > 160 && clicks <= 170) {
    return "QUE ISSO NOVINHA(O)!!";
  } else if (clicks > 170 && clicks <= 180) {
    return "VC TA CARANGUEJEIRA MASTER!!";
  } else {
    return "ABSURDAMENTE TOPZ SQN!! HAHAHA";
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