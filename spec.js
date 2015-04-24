var randomGuid = require("./index.js");
var assert = require("assert");
describe('render markdown from README.md', function () {
	it('should return a random GUID', function () {
		var random = randomGuid();
		assert.equal(typeof random, "string");
	})
})