Router.route("/", {
  name: "home",
  fastRender: true,
  waitOn: function() {
    return [
      Meteor.subscribe("players"),
      Meteor.subscribe("games")
    ];
  },
  action: function() {
    this.render("home");
  }
});