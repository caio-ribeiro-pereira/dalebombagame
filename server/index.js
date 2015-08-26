Meteor.startup(function() {
  Players.remove({});
  Games.remove({});
  Players._ensureIndex({clicks: 1});
  Games._ensureIndex({timer: 1});
  console.log("DaleBombaGame server running!");
});