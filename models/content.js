'use strict';

var Backbone = require('backbone'),
    moment   = require('moment');

var Content;

Content = Backbone.Collection.extend({
	model : Backbone.Model.extend({
		getMoment : function() {
			return moment(this.get('datetaken'));
		},
		getType : function() {

			var types = {
				flickr : null
			}

			var attrib = Object.keys(this.attributes);

			types['flickr'] = (attrib[1] === 'owner' && attrib[2] === 'secret' && attrib[3] === 'server');

			return types;

		}
	})
});

module.exports = Content;