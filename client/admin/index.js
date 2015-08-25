Template.admin.helpers({ 
  canShowStartGame: function() {
    return Players.find({}).count() >= 2;
  }
});

Template.admin.events({
  "click button": function(e, template) {
    var seconds = 30, intervalID;
    e.preventDefault();
    e.target.disabled = true;
    Meteor.call("startGame");
    intervalID = Meteor.setInterval(function() {
      if (seconds < 0) {
        Meteor.call("stopGame");
        e.target.disabled = false;
        e.target.textContent = "COMEÇAR";
        Meteor.clearInterval(intervalID);
      } else {
        e.target.textContent = (seconds--);
      }
    }, 1000);
  }
});