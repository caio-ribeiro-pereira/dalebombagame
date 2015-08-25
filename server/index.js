Meteor.startup(function() {
  Players.remove({});
  Games.remove({});
  Players._ensureIndex({clicks: 1});
  console.log("DaleBombaPlay up and running!");
});