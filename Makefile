run: build
	docker run inktestate:latest

build:
	cd docker && docker build -t inktestate:latest .
