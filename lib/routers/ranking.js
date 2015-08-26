Router.route("/ranking", {
  name: "ranking",
  fastRender: true,
  waitOn: function() {
    return Meteor.subscribe("players");
  },
  action: function() {
    this.render("ranking");
  }
});