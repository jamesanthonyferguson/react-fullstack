'use strict';

var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var NAV = require('./NavBar.jsx');
var BANNER = require('./Banner.jsx');
var TODO = require('./ToDo.jsx');

var Q = require('q');

function getAppState(){
  return AppStore.getData();
}

function getInitialAppState(){
  return AppStore.getInitialData();
}

var APP = React.createClass({

  getInitialState: function(){
    return getInitialAppState();
    // return getAppState();
    // return null;
  },

  _onChange: function(){
    this.setState(getAppState());
  },

  componentDidMount: function(){
    AppStore.addChangeListener(this._onChange);
    Q(AppActions.populateAction()).then(function(promisedData){
      console.log(promisedData);
      this.setState(promisedData);
    });
  },

  componentWillUnmount: function(){
    AppStore.removeChangeListener(this._onChange);
  },

  handleClick: function(){
    AppActions.exampleAction('Data from View');
  },

  render: function(){
    return (
      <div>
        <NAV/>
        <BANNER/>
        <TODO allTodos={this.state.todos}/>
      </div>
      )
  }
})

module.exports = APP;

// AppActions.populateAction();
// return AppDispatcher.handleViewAction();
// AppStore.getData()
// httpGet

// AppActions.pop()
//   .then( AppDispatcher.handleViewAction(options) )
//   .then( AppStore.getData() )
//   .then( httpGet( url ) )
//   .then(function( data){

//   })












