run: build
	docker run -v $(shell pwd)/out:/app/out inktestate:latest

build:
	cd docker && docker build -t inktestate:latest .
	mkdir -p out
