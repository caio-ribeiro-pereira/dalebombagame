Router.route("/admin", {
  name: "admin",
  fastRender: true,
  waitOn: function() {
    return Meteor.subscribe("players");
  },
  action: function() {
    this.render("admin");
  }
});