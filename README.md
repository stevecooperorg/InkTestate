# InkTestate

So [ink-proof](https://github.com/chromy/ink-proof) is a great tool for testing ink compilers and runtimes, but what about testing your own ink stories?

This is a proof-of-concept that hijacks all the good work of ink-proof to create unit-testable ink stories.

It is more or less a runner which uses [ink-proof test cases](https://github.com/chromy/ink-proof#test-cases) to validate a story.

It uses Docker so that you don't have to install anything other than Docker.

The rough idea is; 

- you create a story with modules -- say, `safe-cracking.ink` with code for your safe-cracking puzzle.
- you create a test case with an `.ink` file as a test harness -- probably including a `INCLUDE` statement to import your module, to set state, and to jump to the right knot.
- you create an input file describing user interactions -- this is just the options selected, in order
- you create a transcript.txt which shows the expected output of this 'mini-playthrough'.

# Setup - Building InkTestate

- clone this repo
- run `make build` to create the `inktestate:latest` docker image locally

# Running your tests

To run the tests, you need to do a `docker run` something like this;

```
rm -rf out
mkdir -p out
docker run \
    -v /my-story/out:/app/out \
    -v /my-story/tests:/app/ink \
    -v /my-story/empty-dir:/app/bytecode \
    inktestate:latest
```