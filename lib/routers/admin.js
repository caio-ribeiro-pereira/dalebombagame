FlowRouter.route("/admin", {
  subscriptions: function() {
    this.register("players", Meteor.subscribe("players"));
  },
  action: function(params, query) {
    BlazeLayout.render("admin");
  }
});