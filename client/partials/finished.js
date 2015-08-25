Template.finished.events({
  "click button[data-play-again]": function(e, template) {
    e.preventDefault();
    Session.set("waiting", true);
    Meteor.call("replayGame", Session.get("playerID"));
  }
});