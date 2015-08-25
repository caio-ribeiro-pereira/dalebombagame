Template.home.onRendered(function() {
  var input = this.find("input")
  input && input.focus();
});

Template.home.helpers({
  canPlay: function() {
    return Games.canPlay();
  },
  isFinished: function() {
    return Players.isFinished(Session.get("playerID"));
  },
  totalOfClicks: function() {
    return Players.clicks(Session.get("playerID"));
  },
  isWinner: function() {
    return Players.isWinner(Session.get("playerID"));
  },
  isPlaying: function() {
    return Players.isPlaying(Session.get("playerID"));
  },
  isWaiting: function(){
    var hasPlayers = !!Players.find({}).count();
    var isNotPlaying = !Players.isPlaying(Session.get("playerID"));
    var isWaiting = Session.get("waiting");
    return isWaiting && isNotPlaying && hasPlayers;
  }
});

Template.home.events({
  "click button[data-click]": function(e, template) {
    e.preventDefault();
    var playerID = Session.get("playerID");
    Meteor.call("clickClickClick", playerID, function() {
      var mp3 = template.find("audio[data-mp3]");
      var ogg = template.find("audio[data-ogg]");
      var sound = mp3.canPlayType ? mp3 : ogg;
      sound.pause();
      sound.currentTime = 0;
      sound.play();
    });
  },
  "click button[data-play-again]": function(e, template) {
    e.preventDefault();
    Session.set("waiting", true);
    Meteor.call("replayGame", Session.get("playerID"));
  },
  "submit form": function(e, template) {
    e.preventDefault();
    var input = template.find("input");
    Meteor.call("enterGame", input.value, function(err, id) {
      if (err) {
        alert(err.message);
        input.value = "";
        input.focus();
      } else {
        Session.set("playerID", id);
        Session.set("waiting", true);
      }
    });
  }
});