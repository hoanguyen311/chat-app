var Bird = require('./Bird.js');
var _ = require('lodash');

function Birds(data) {
	this.birds = [];
	this.Child = Bird;

	if (data != undefined && Array.isArray(data) && data.length > 0) {
		data.forEach(function(name) {
			this.add(name);
		}, this);
	}
}

Birds.prototype = {
	get: function() {
		return this.birds;
	},
	add: function(name) {
		var id = _.uniqueId();
		var bird = new this.Child(id , name);
		this.birds.push(bird);
	},
	getById: function(id) {
		return _.where(this.birds, {id: id.toString()});
	}
};

module.exports = Birds;