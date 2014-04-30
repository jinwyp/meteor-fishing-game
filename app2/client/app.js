
Meteor.autorun(function(){

    Meteor.subscribe("publicationClicks");
    Meteor.subscribe("publicationProjects");
    Meteor.subscribe("publicationUsermessages");
    Meteor.subscribe("publicationUserfriends", 0);

});


    Session.setDefault('cssUserMessageMenu', false);
    Session.setDefault('cssUserMessageListBox', true);
    Session.setDefault('dataCurrentUserIdMessage', null);

    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL'
    });

    Session.setDefault('showProjectForm', false);


    Router.map(function(){
        this.route('homepage', {path: "/"});
        this.route('fishing', {path: "/game"})
    });




    Template.usermessages.allusers = function(){
        return Meteor.users.find({_id: { $ne: Meteor.userId()}}) ;
    };
    Template.usermessages.currentUserMessage = function(){
        if(Session.get('dataCurrentUserIdMessage') ){
            var currentUserMessage = {
                user : Meteor.users.findOne({_id: Session.get('dataCurrentUserIdMessage')}),
                messages : Usermessages.find({
                    $or : [
                        {
                          fromUserId : Meteor.userId(),
                          toUserId: Session.get('dataCurrentUserIdMessage')
                        },
                        {
                          fromUserId : Session.get('dataCurrentUserIdMessage'),
                          toUserId: Meteor.userId()
                        }
                    ]
                }, {sort:{sendDate: -1}})
            };

            currentUserMessage.messages.forEach(function(message){
                if(message.fromUserId == Meteor.userId()){
                    message.classmysend = 'message_me';
                }else{
                    message.classmysend = 'message_other';
                }
            });

            return currentUserMessage ;
        }
    };


    Template.usermessages.classUserMessageListBox = function(){
        return Session.get('cssUserMessageListBox') ;
    };
    Template.usermessages.classUserMessageMenu = function(){
        return Session.get('cssUserMessageMenu') ;
    };
    Template.topnav.events = ({
        'click .click_show_user_menu' : function(event, tmpl){
            Session.set('cssUserMessageMenu', !Session.get('cssUserMessageMenu')) ;
            console.log(this);
        }
    });

    Template.usermessages.events = ({
        'click .click_hide_message_menu' : function(event, tmpl){
            Session.set('cssUserMessageMenu', !Session.get('cssUserMessageMenu')) ;
        },
        'click .click_show_message_list' : function(event, tmpl){
            Session.set('cssUserMessageListBox', false) ;
            Session.set('dataCurrentUserIdMessage', this._id) ;
            console.log(this);
        },
        'click .click_back_message_list' : function(event, tmpl){
            Session.set('cssUserMessageListBox', true) ;
            Session.set('dataCurrentUserIdMessage', null) ;
        },
        'click .click_send_usermessage' : function(event, tmpl){
            var newmessage = {
                fromUserId : Meteor.userId(),
                toUserId : Session.get('dataCurrentUserIdMessage'),
                content : tmpl.find('.usermessage_content').value,
                sendDate : new Date()
            };
            console.log(this);
            if(newmessage.content != ''){
                Usermessages.insert(newmessage);
            }
            return false;



        }


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
            return moment(datetime).format("MM-DD-YYYY");
        }else{
            return datetime;
        }
    });

    Handlebars.registerHelper("formatDateTime", function(datetime){
        if(moment){
            return moment(datetime).format("MM-DD-YYYY  h:mm:ss a");
        }else{
            return datetime;
        }
    });


    Handlebars.registerHelper("ngShow", function(ifshow){
        if(ifshow){
            return '';
        }else{
            return 'displaynone';
        }
    });

    Handlebars.registerHelper("ngHide", function(ifshow){
        if(ifshow){
            return 'displaynone';
        }else{
            return '';
        }
    });

    Handlebars.registerHelper("ngClassCurrentUser", function(ifUserId, classnametrue, classnamefalse){

        if(ifUserId == Meteor.userId()){
            return classnametrue;
        }else{
            return classnamefalse;
        }
    });
//
//    ngMeteor.controller('userinfoController', ['$scope', '$collection', function($scope, $collection){
//        $scope.data = {
//            newMessage : {
//                body : '',
//                createdate : 0
//            }
//        };
//
//        $collection("Usermessages", $scope);
//
//
//        $scope.addNewMessage = function(){
//
//
//            $scope.data.newMessage.createdate = new Date();
//
//            $scope.Usermessages.add($scope.data.newMessage);
//
//            $scope.data.newMessage.body = '';
//        }
//
//
//    }]);





