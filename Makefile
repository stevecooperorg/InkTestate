run: build
	rm -rf out
	mkdir -p out
	docker run \
		-v $(shell pwd)/out:/app/out \
		-v $(shell pwd)/examples/basic:/app/ink \
        -v $(shell pwd)/examples/bytecode:/app/bytecode \
        inktestate:latest

build:
	cd docker && docker build -t inktestate:latest .
