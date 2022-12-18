.PHONY: all
all: node browser

.PHONY: src/index.ts
js/index.js: src/index.ts
	#tsc src/index.ts
	tsc

node: js/index.js
	npx webpack-cli --config misc/webpack.node.config.js

browser: js/index.js
	npx webpack-cli --config misc/webpack.browser.config.js

.PHONY: dist prod
dist prod: js/index.js
	npx webpack-cli --mode=production --config misc/webpack.node.config.js
	npx webpack-cli --mode=production --config misc/webpack.browser.config.js
