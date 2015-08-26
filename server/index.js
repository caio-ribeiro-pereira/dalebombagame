Meteor.startup(function() {
  Players.remove({});
  Games.remove({});
  Players._ensureIndex({c: 1, p: 1, f: 1});
  Games._ensureIndex({t: 1, r: 1, w: 1});
  console.log("DaleBombaGame server running!");
});