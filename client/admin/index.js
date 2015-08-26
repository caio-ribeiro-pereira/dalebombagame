Template.admin.events({
  "click button[data-clear]": function(e, template) {
    e.preventDefault();
    Meteor.call("clearGame");
  },
  "click button[data-start]": function(e, template) {
    e.preventDefault();
    Meteor.call("startGame");
  }
});