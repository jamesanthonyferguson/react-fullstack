'use strict';
var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var AppActions = {
  populateAction: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.POPULATE
    });
  },
  addItemAction: function(text) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD,
      text: text
    });
  },
  removeItemAction: function(id) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE,
      id: id
    });
  }
};

module.exports = AppActions;
