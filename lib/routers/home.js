Router.route("/", {
  name: "home",
  subscriptions: function() {
    return [
      Meteor.subscribe("players"),
      Meteor.subscribe("games")
    ];
  },
  fastRender: true,
  action: function() {
    this.render("home");
  }
});