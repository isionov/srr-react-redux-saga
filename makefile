build-client:
	rm -rf ./asstes/client
	npm run build-client

build-server:
	rm -rf ./asstes/server
	npm run build-server

build-server1:
	rm -rf ./asstes/server1
	npm run build-server1

build:
	make build-client
	make build-server
	make build-server1

start:
	make build
	node assets/server1/server.js