Meteor.publish("player", function(_id){
  return Players.find({_id: _id});
});

Meteor.publish("players", function(){
  return Players.findByMostClicked();
});

Meteor.publish("games", function() {
  return Games.findCurrentGame();
});