run: build
	docker run -v $(shell pwd)/out:/app/out -v $(shell pwd)/examples/basic:/app/ink inktestate:latest

build:
	cd docker && docker build -t inktestate:latest .
	mkdir -p out
