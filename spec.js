var randomGuid = require("./index.js")
	.randomGuid;
var domSafeRandomGuid = require("./index.js")
	.domSafeRandomGuid;
var jsdom = require('mocha-jsdom');
var expect = require('chai')
	.expect;

var assert = require("assert");
describe('generate random GUIDS', function() {
	jsdom();

	it('should return a random GUID', function() {
		expect(randomGuid())
			.to.have.length.of.at.least(4);
	})

	it('should return a DOM safe GUID', function() {
		expect(domSafeRandomGuid())
			.to.have.length.of.at.least(4);
	})

})