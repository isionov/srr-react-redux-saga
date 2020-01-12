build-client:
	rm -rf ./assets/client
	npm run build-client
	cp ./src/client/index.html ./assets/client/

build-server:
	rm -rf ./assets/server
	npm run build-server

build-server1:
	rm -rf ./assets/server1
	npm run build-server1

build:
	make build-client
	make build-server
	make build-server1

start:
	make build
	node assets/server1/main.js