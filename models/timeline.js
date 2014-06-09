'use strict';

var Backbone = require('backbone'),
    moment   = require('moment');

var Timeline;

Timeline = Backbone.Collection.extend({
	model : Backbone.Model.extend({
		getMoment : function() {
			return moment(this.get('time'));
		}
	})
});

module.exports = Timeline;