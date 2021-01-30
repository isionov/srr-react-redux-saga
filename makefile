build-client:
	rm -rf ./assets/client
	npm run build-client
	cp ./src/client/index.html ./assets/client/

build-server:
	rm -rf ./assets/server
	npm run build-server

build:
	make build-client
	make build-server

start:
	make build
	node assets/serverNode/serverNode.js