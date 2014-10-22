'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _data = {
  todos: []
};

// {item:'React', id: 0},
//     {item:'Flux', id: 1},
//     {item:'Gulp', id: 2},
//     {item:'Express Server', id: 3},
//     {item: 'Mongo Database', id: 4}

var AppStore = merge(EventEmitter.prototype, {

  getData: function(){
    $.ajax({
      url: '/api/things',
      success: function(data) {
        var output = [];
        for (var i in data) {
          var temp = {id: i, _id: data[i]['_id'], item: data[i]['name']};
          output.push(temp);
        }
        _data.todos = output;
        return _data.todos;
      },
      failure: function(err) {
        console.log('failed to reach the db',err)
      }
    });
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;

  if(action.actionType === AppConstants.POPULATE) {
    AppStore.getData();
  }

  if(action.actionType === AppConstants.ADD){

    //Find out how many elements are in the todo.
    //Make new todo - id = highest id +1, message = name
    //Submit Post Req
    //On Success, getData?
    var id;
    if (_data.todos.length > 0) {
      id = _data.todos[_data.todos.length-1].id + 1;
    } else {
      id = 0;
    }
    var temp = {item: action.text, id: id};
    _data.todos.push(temp);
    $.ajax({
      type: 'POST',
      data: JSON.Stringify(temp),
      contentType: 'application/json',
      url: '/api/things/',
      success: function(item) {
        console.log('db reconciled with memory. added:', item);
        AppStore.getData();
      },
      failure: function(item) {
        console.log('db failed to reconciled with memory.');
        AppStore.getData();
        //Maybe add some Visual To improve user experience e.g. a sorry message
      }
    });
  }



  if(action.actionType === AppConstants.REMOVE){
    for (var i = 0; i < _data.todos.length; i++) {
      if (_data.todos[i].id === action.id) {
        var temp = _data.todos.splice(i, 1);
        //AJAX GET passing in n
        $.ajax({
          type: 'DELETE',
          url: '/api/thing/' + temp['_id'],
          success: function(){
            console.log('item removed successfully');
          },
          remove: function(failure){
            console.log('item removed successfully');
            AppStore.getData();
          },
        });
        break;
      }
    }
  }

  AppStore.emitChange();

});



module.exports = AppStore;
