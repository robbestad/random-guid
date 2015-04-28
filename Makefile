BIN = ./node_modules/.bin
uglify = /usr/local/lib/node_modules/uglify-js/bin/uglifyjs

install link:
	@npm $@

test:
	npm test

lint:
	jsxhint -c .jshintrc ./index.js

patch: test
	@$(call release,patch)

minor: test 
	@$(call release,minor)

major: test 
	@$(call release,major)

jsx: test
	gulp	

publish:  
	@$(uglify) index.js > dist/random-guid.min.js
	git commit -am "new release" --allow-empty
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
