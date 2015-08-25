Router.route("/admin", {
  name: "admin",
  subscriptions: function() {
    return Meteor.subscribe("players");
  },
  fastRender: true,
  action: function() {
    this.render("admin");
  }
});