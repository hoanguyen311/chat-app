var crypto = require('crypto');

var User = {
	userIds: [],
	register: function(id) {
		return this.userIds.push(id);
	},
	isRegistered: function(id) {
		if (id === undefined) return false;
		return (this.userIds.indexOf(id) != -1);
	},
	getUserCount: function() {
		return this.userIds.length;
	}
}

module.exports = User;