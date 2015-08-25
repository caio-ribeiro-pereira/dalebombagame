Template.welcome.onRendered(function() {
  var input = this.find("input");
  input && input.focus();
});

Template.welcome.events({
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