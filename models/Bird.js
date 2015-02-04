module.exports = function Bird(id, name) {
	this.id = id;
	this.name = name;
	this.hello = function() {
		return "Hello, I am " + name;
	};
};