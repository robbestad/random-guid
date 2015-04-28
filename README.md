# random-guid

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
