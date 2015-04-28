# random-guid

# CONTRIBUTING

When making edits, please edit _index.es6_. _index.js_ will be generated automatically when you run _make test_.

### randomGuid([int blocks])

Generate a random guid, separated with dashes. 

## Usage
var randomGuid = require("random-guid")
    .randomGuid;

### domSafeRandomGuid([int blocks])

Generate a guid that is tested unique against id's on the current doc.

## Usage
var domSafeRandomGuid = require("random-guid")
    .domSafeRandomGuid;
