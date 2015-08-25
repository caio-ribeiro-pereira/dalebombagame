Meteor.startup(function() {
  Session.setDefault("playerID", null);
  Session.setDefault("waiting", false);
});