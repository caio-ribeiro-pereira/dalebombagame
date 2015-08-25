Template.home.onRendered(function() {
  var input = this.find("input");
  input && input.focus();
});

Template.home.events({
  "click button[data-click]": function(e, template) {
    e.preventDefault();
    var playerID = Session.get("playerID");
    Meteor.call("clickClickClick", playerID, function() {
      var mp3 = template.find("audio[data-mp3]");
      var ogg = template.find("audio[data-ogg]");
      var sound = mp3.canPlayType ? mp3 : ogg;
      sound.pause();
      sound.currentTime = 0;
      sound.play();
    });
  },
  "click button[data-play-again]": function(e, template) {
    e.preventDefault();
    Session.set("waiting", true);
    Meteor.call("replayGame", Session.get("playerID"));
  },
  "click button[data-cancel]": function(e, template) {
    e.preventDefault();
    IonPopup.confirm({
      title: "Hey!",
      template: "Você deseja sair deste jogo?",
      onOk: function() {
        Meteor.call("cancelWaitGame", Session.get("playerID"));
        Session.get("playerID", null);
        IonPopup.close();
      },
      onCancel: function() {
        IonPopup.close();
      }
    });
  },
  "submit form": function(e, template) {
    e.preventDefault();
    var input = template.find("input");
    Meteor.call("enterGame", input.value, function(err, id) {
      if (err) {
        IonPopup.show({
          title: "Atenção",
          template: err.reason,
          buttons: [{
            text: "Ok",
            type: "button-positive",
            onTap: function() {
              input.value = "";
              input.focus();   
              IonPopup.close();
            }
          }]
        });
      } else {
        Session.set("playerID", id);
        Session.set("waiting", true);
      }
    });
  }
});