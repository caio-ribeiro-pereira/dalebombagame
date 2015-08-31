Template.registerHelper("players", function() {
  var playerID = Session.get("playerID");
  return Players
    .findByMostClicked(Games.currentID())
    .map(function(player, index) {
      player["position"] = (index + 1);
      player["highlight"] = (playerID === player._id ? "balanced" : "dark");
      return player;
    });
});

Template.registerHelper("numberOfPlayers", function() {
  return Players.find({g: Games.currentID()}).count();
});

Template.registerHelper("playerID", function() {
  return Session.get("playerID");
});

Template.registerHelper("timeElapsed", function() {
  return Games.timeElapsed();
});

Template.registerHelper("timeWaiting", function() {
  return Games.timeWaiting();
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
  if (clicks <= 20) {
    return "DALE BOMBA!";
  } else if (clicks > 20 && clicks <= 40) {
    return "BOA! MUITO TOPZ!";
  } else if (clicks > 40 && clicks <= 60) {
    return "UNBELIVABLOUW!!!";
  } else if (clicks > 60 && clicks <= 80) {
    return "MUY LOKOOOO!!!";
  } else if (clicks > 80 && clicks <= 100) {
    return "TOLE BOMBA! DALE BOMBA!!";
  } else if (clicks > 100 && clicks <= 120) {
    return "XESSUIIISSS!!";
  } else if (clicks > 120 && clicks <= 140) {
    return "PORRAAAANNNN!!";
  } else if (clicks > 140 && clicks <= 160) {
    return "QUE ISSSUUUUU!! o_O";
  } else if (clicks > 160 && clicks <= 180) {
    return "VAI PERDER O DEDO! kkkkk";
  } else if (clicks > 180 && clicks <= 200) {
    return "DEDINHO NERVOSO HEIN!!";
  } else if (clicks > 200 && clicks <= 220) {
    return "SERA QUE GANHA??";
  } else if (clicks > 220 && clicks <= 240) {
    return "JÁ CONSEGUI MAIS QUE ISSO!! :P";
  } else if (clicks > 240 && clicks <= 260) {
    return "SEU FRACO, VAI PERDER!! HAHAHA";
  } else if (clicks > 260 && clicks <= 280) {
    return "É MENTIRA, VC TA INDO BEM! :D";
  } else if (clicks > 280 && clicks <= 300) {
    return "NÃO PARA, NÃO PARA, NÃO PARA, NÃO!";
  } else if (clicks > 300 && clicks <= 320) {
    return "ACHO QUE VOCÊ ESTA FICANDO LOUCO!!";
  } else if (clicks > 320 && clicks <= 340) {
    return "QUE ISSO NOVINHA(O)!!";
  } else if (clicks > 340 && clicks <= 360) {
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