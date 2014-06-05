'use strict';

var Backbone = require('backbone'),
    moment   = require('moment');

var Collection, Model;



Collection = Backbone.Collection.extend({
	model : Backbone.Model.extend({
		getMoment : function() {
			return moment(this.get('time'));
		}
	})
});

module.exports = Collection;