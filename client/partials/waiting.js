Template.waiting.events({
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
  }
});