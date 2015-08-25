Template.gameboard.onRendered(function() {
  var seconds = TIMER;
  var timerLabel = this.find("[data-timer]");
  var clickButton = this.find("[data-click]");
  var intervalID = Meteor.setInterval(function() {
    if (seconds < 0) {
      clickButton.disabled = true;
      Meteor.clearInterval(intervalID);
    } else {
      timerLabel.textContent = (seconds--);
    }
  }, 1000);
});

Template.gameboard.events({
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
  }
});