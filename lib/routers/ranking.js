Router.route("/ranking", {
  name: "ranking",
  subscriptions: function() {
    return Meteor.subscribe("players");
  },
  fastRender: true,
  action: function() {
    this.render("ranking");
  }
});