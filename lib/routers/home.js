FlowRouter.route("/", {
  subscriptions: function() {
    this.register("players", Meteor.subscribe("players"));
    this.register("games", Meteor.subscribe("games"));
  },
  action: function(params, query) {
    BlazeLayout.render("home");
  }
});