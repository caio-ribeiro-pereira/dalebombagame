Router.route("/admin", {
  name: "admin",
  fastRender: true,
  waitOn: function() {
    return [
      Meteor.subscribe("players"),
      Meteor.subscribe("games")
    ];
  },
  action: function() {
    this.render("admin");
  }
});