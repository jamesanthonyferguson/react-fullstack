'use strict';

var React = require('react');

var AppStore = require('../stores/AppStore');
var AppActions = require('../actions/AppActions');

var NAV = require('./NavBar.jsx');
var BANNER = require('./Banner.jsx');

function getAppState(){
  return AppStore.getData()
};

var APP = React.createClass({
  getInitialState: function(){
    return getAppState();
  },

  _onChange: function(){
    this.setState(getAppState());
  },

  componentDidMount: function(){
    AppStore.addChangeListener(this._onChange);
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
        <button onClick={this.handleClick}>{this.state.message}</button>
      </div>
      );
  }
})

module.exports = APP;