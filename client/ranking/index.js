Template.ranking.onRendered(function() {
  var playerID = Session.get("playerID");
  var playerItem = this.find("[data-player-id='"+ playerID +"']");
  playerItem && playerItem.classList.add("balanced");
});

Template.ranking.events({
  "click button[data-play-again]": function(e, template) {
    e.preventDefault();
    Session.set("waiting", true);
    Meteor.call("replayGame", Session.get("playerID"));
    Router.go("/");
  }
});