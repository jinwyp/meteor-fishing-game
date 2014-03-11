
if (Meteor.isClient) {

    Meteor.subscribe("clicks");
    Meteor.subscribe("projects");
    Meteor.subscribe("usermessages");

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });

    Session.setDefault('showProjectForm', false);
    Meteor.Router.add({
        '/' : 'homepage',
        '/game' : 'fishing',
        '/userinfoindex' : 'userinfoindex'
    });



    Template.fishing.projectList = function(){

        return Projects.find() ;
    };

    Template.fishing.showProjectForm = function(){
        return Session.get('showProjectForm');
    };

    Template.fishing.events ({
        'click .save' : function(event, tmpl){
            var newproject = {
                name : tmpl.find('.name').value,
                client : tmpl.find('.client').value,
                status : tmpl.find('.status').value
            };
            Projects.insert({
                name : newproject.name,
                client : newproject.client,
                status : newproject.status,
                duedate : new Date()

            });


        }
    });




    Template.homepage.showClicks = function() {
        return Clicks.find();
    };



    Template.homepage.events ({
        'click #add' : function(){
            Meteor.call('addClick');
        }
    });





    Handlebars.registerHelper("formatDate", function(datetime){
        if(moment){
            return moment(datetime).format("MM/DD/YYYY");
        }else{
            return datetime;
        }
    });



    ngMeteor.controller('userinfoController', ['$scope', '$collection', function($scope, $collection){
        $scope.data = {
            newMessage : {
                body : '',
                createdate : 0
            }
        };

        $collection("Usermessages", $scope);
        Usermessages.ready(function(){
            console.log(Usermessages);
        });



        $scope.addNewMessage = function(){
            $scope.data.newMessage.createdate = new Date();

            $scope.Usermessages.add($scope.data.newMessage);

            $scope.data.newMessage.body = '';
        }


    }]);



}

