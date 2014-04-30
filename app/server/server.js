/**
 * Created by jinwyp on 14-2-24.
 */


if (Meteor.isServer) {



    Usermessages.allow({
        insert : function(){
            return true;
        },
        update : function(){
            return true;
        },
        remove : function(){
            return true
        }
    });


//    Projects.deny({
//        insert:function(){
//            return false;
//        }
//    });


    Meteor.startup(function () {

        // code to run on server at startup



/*        // bootstrap the admin user if they exist -- You'll be replacing the id later
        if (Meteor.users.findOne("jkAjmuCsNzbm4qrMe"))
            Roles.addUsersToRoles("jkAjmuCsNzbm4qrMe", ['admin']);

        // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
        if(!Meteor.roles.findOne({name: "normaluser"}))
            Roles.createRole("normaluser");
            */


    });


/*

    Accounts.onCreateUser(function(options, user) {

        Roles.addUsersToRoles(user._id, ["normaluser"]);

        var d6 = function () { return Math.floor(Random.fraction() * 6) + 1; };
        user.dexterity = d6() + d6() + d6();

        return user;
    });
*/




    Meteor.methods({
        'removeAllProjects' : function(){
            Projects.remove({});
        },

        'addClick' : function(){
            Clicks.insert({"num" : Math.floor(Math.random()*1000)});
        },

        'addUserMessage' : function(){

        }

    });



}
