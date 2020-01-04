build-client:
	rm -rf ./dist/client
	npm run build-client

build-server:
	rm -rf ./dist/server
	npm run build-server

build:
	make build-client
	make build-server
	node dist/server/main.bundle.js