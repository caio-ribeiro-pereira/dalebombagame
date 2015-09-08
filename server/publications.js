Meteor.startup(function() {
  Meteor.publish("player", function(_id){
    return Players.find({_id: _id});
  });

  Meteor.publish("players", function(){
    return Players.find({});
  });

  Meteor.publish("games", function() {
    return Games.findCurrentGame();
  });
});