uglify = ./node_modules/.bin/uglifyjs
babel = ./node_modules/.bin/babel

install link:
	@npm $@

test:
	@$(call babel)
	@$(call lint)
	npm test

lint:
	./node_modules/.bin/eslint index.es6

patch: test
	@$(call release,patch)

minor: test 
	@$(call release,minor)

major: test 
	@$(call release,major)

babel:
	@$(babel) index.es6 > index.js
	
minify:
	@$(uglify) index.js > dist/random-guid.min.js
	
publish:
	@$(call test)
	@(sh bin/authors)
	@$(call minify)
	git commit -am "`npm view . version`" --allow-empty
	@$(call release,patch)
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
