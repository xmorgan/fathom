JS := $(shell find . -name '*.mjs' | sed 's/\.mjs/\.js/')

# It's faster to invoke Babel once and compile everything than to invoke it
# separately on even 2 individual files that changed.
%.js: %.mjs; @node_modules/.bin/babel *.mjs **/*.mjs --out-dir .

all: $(JS)

lint:
	@node_modules/.bin/eslint --ext mjs .

test: $(JS)
	@node_modules/.bin/mocha

coverage: $(JS)
	@node_modules/.bin/istanbul cover node_modules/.bin/_mocha

debugtest: $(JS)
	# This is known to work on node 7.6.0.
	@node_modules/.bin/mocha --inspect --debug-brk

clean:
	rm -f $(JS)

.PHONY: all lint test coverage debugtest
