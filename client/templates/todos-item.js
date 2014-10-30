// var EDITING_KEY = 'EDITING_TODO_ID';



// Template.todosItem.helpers({
//   checkedClass: function() {
//     return this.checked && 'checked';
//   },
//   editingClass: function() {
//     return Session.equals(EDITING_KEY, this._id) && 'editing';
//   }
// });

// Template.todosItem.events({

// Template.listsShow.events({
//   'click .addInterest':function(evt,tmpl){
//     evt.preventDefault();
//     Session.set('adding_interest',true);
//   }
// })

Template.addform.events({

  'click .save':function(evt,tmpl){
    // event.preventDefault();
    var thoughts = tmpl.find('.thoughts').value;
    var author = tmpl.find('.author').value;
    var name = tmpl.find('.name').value;
    var url= tmpl.find('.src').value;
    var listId = Router.current().params._id;
    var owner = Meteor.userId();
    var createdAt = new Date();
    // var listId =tmpl.find('.active');
    // var height = getRandomInt(100,1000);
    Todos.insert({name:name,author:author,thoughts:thoughts,src:url,height:1000,width:'25%',listId: listId,owner: owner, createdAt: createdAt,});
    Lists.update(listId, {$inc: {incompleteCount: 1}});
    Session.set('adding_interest',false);
  },
  'click .cancel':function(evt,tmpl){
    Session.set('adding_interest',false);
  },
  'click .close':function(evt,tmp){
    Session.set('adding_interest',false);
  }
});
  // 'change [type=checkbox]': function(event) {
  //   var checked = $(event.target).is(':checked');
  //   Todos.update(this._id, {$set: {checked: checked}});
  //   Lists.update(this.listId, {$inc: {incompleteCount: checked ? -1 : 1}});
  // },

  // 'focus input[type=text]': function(event) {
  //   Session.set(EDITING_KEY, this._id);
  // },
  //
  // 'blur input[type=text]': function(event) {
  //   if (Session.equals(EDITING_KEY, this._id))
  //     Session.set(EDITING_KEY, null);
  // },
  //
  // 'keydown input[type=text]': function(event) {
  //   // ESC or ENTER
  //   if (event.which === 27 || event.which === 13) {
  //     event.preventDefault();
  //     event.target.blur();
  //   }
  // },
  //
  // // update the text of the item on keypress but throttle the event to ensure
  // // we don't flood the server with updates (handles the event at most once
  // // every 300ms)
  // 'keyup input[type=text]': _.throttle(function(event) {
  //   Todos.update(this._id, {$set: {text: event.target.value}});
  // }, 300),

  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
Template.todo.events({
  'mousedown .js-delete-item, click .js-delete-item': function() {
    Todos.remove(this._id);
    if (! this.checked)
      Lists.update(this.listId, {$inc: {incompleteCount: -1}});
  }
});


Template.sharelist.events({
  'click .save':function(evt,tmpl){
    // event.preventDefault();
    var shareusername = tmpl.find('.shareusername').value;
    var listId = Router.current().params._id;
    var owner = Meteor.userId();
    var createdAt = new Date();
    Lists.update(listId,{$push: {access: shareusername}});
    // console.log(ListAccess.find().fetch());
    // console.log("hi");
    Session.set('sharing_list',false);
  },
  'click .cancel':function(evt,tmpl){
    Session.set('sharing_list',false);
  },
  'click .close':function(evt,tmp){
    Session.set('sharing_list',false);
  }
});

