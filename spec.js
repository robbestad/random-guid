var randomGuid = require("./index.js")
	.randomGuid;
var domSafeRandomGuid = require("./index.js")
	.domSafeRandomGuid;
var jsdom = require('mocha-jsdom');
var expect = require('chai')
	.expect;

var assert = require("assert");
describe('render markdown from README.md', function() {
	jsdom();

	it('should return a random GUID', function() {
		var random = randomGuid();
		assert.equal(typeof random, "string");
	})

	it('should return a DOM safe GUID', function() {
		var random = domSafeRandomGuid();
		assert.equal(typeof random, "string");
	})

})