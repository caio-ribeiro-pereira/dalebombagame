Template.admin.events({
  "click button[data-clear]": function(e, template) {
    e.preventDefault();
    Meteor.call("clearGame");
  },
  "click button[data-start]": function(e, template) {
    var seconds = 30, intervalID;
    var clear = template.find("button[data-clear]");
    e.preventDefault();
    e.target.disabled = true;
    clear.disabled = true;
    Meteor.call("startGame");
    intervalID = Meteor.setInterval(function() {
      if (seconds < 0) {
        Meteor.call("stopGame");
        e.target.disabled = false;
        clear.disabled = false;
        e.target.textContent = "COMEÇAR";
        Meteor.clearInterval(intervalID);
      } else {
        e.target.textContent = (seconds--);
      }
    }, 1000);
  }
});