Usermessages = new Meteor.Collection('usermessages');


if (Meteor.isClient) {
    Meteor.subscribe("usermessages");

    ngMeteor.controller('userinfoController', ['$scope', '$collection', function($scope, $collection){
        $scope.data = {
            newMessage : {
                body : '',
                createdate : 0
            }
        };

        Usermessages = $collection("Usermessages", $scope);

        Usermessages.ready(function(){
            console.log("1111");
        });

        $scope.addNewMessage = function(){
            $scope.data.newMessage.createdate = new Date();

            $scope.Usermessages.add($scope.data.newMessage);

            $scope.data.newMessage.body = '';
        };


    }]);
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

    Meteor.publish('usermessages', function(selector, options, publisher){
        return Usermessages.find();
    });
}
