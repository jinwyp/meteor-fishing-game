/**
 * Created by jinwyp on 14-3-12.
 */


Meteor.publish('publicationClicks', function(){
    return Clicks.find();
});

Meteor.publish('publicationProjects', function(){
    return Projects.find();
});

Meteor.publish('publicationUsermessages', function(){
    return Usermessages.find();
});

Meteor.publish('publicationUserfriends', function(usercursor){
//    return Userfriends.find({userId:this.userId});

    return Meteor.users.find({}, {limit:20, skip:usercursor});
});