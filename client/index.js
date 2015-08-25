Meteor.startup(function() {
  BlazeLayout.setRoot(".main");
  Session.setDefault("playerID", null);
  Session.setDefault("waiting", false);
});