Template.gameboard.events({
  "click button[data-click]": function(e, template) {
    e.preventDefault();
    var playerID = Session.get("playerID");
    Meteor.call("clickClickClick", playerID, function() {
      var sound = template.find("audio");
      sound.pause();
      sound.currentTime = 0;
      sound.play();
    });
  }
});