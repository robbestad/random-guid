var randomGuid = require("./index.js")
	.randomGuid;
var domSafeRandomGuid = require("./index.js")
	.domSafeRandomGuid;
var randomString = require("./index.js")
	.randomString;
var jsdom = require('mocha-jsdom');
var expect = require('chai')
	.expect;

var assert = require("assert");
describe('generate random GUIDS', function() {
	jsdom();

	it('should return a random GUID', function() {
		expect(randomGuid(6, 6))
			.to.have.length.of(41);
	})

	it('should return a random string', function() {
		expect(randomString())
			.to.have.length.of.at.least(14);
	})

	it('should return a DOM safe GUID', function() {
		expect(domSafeRandomGuid())
			.to.have.length.of.at.least(4);
	})

})