var Story = require('inkjs').Story;
var fs = require('fs');

//load the ink file
var inkFile = fs.readFileSync('./intercept.ink.json', 'UTF-8').replace(/^\uFEFF/, '');

//create a new story

let console_printer = {
    log: function (...args) {
        console.log(...args);
    }
};

let null_printer = {
    log: function (...args) {
    }
};

let random_player = {
    name: 'random_player',
    reset: function(story) {
        this.forward = 0;
        this.story = story;
    },
    choose: function(count, printer) {
        this.forward ++;
        if (this.forward % 5 === 0) {
            console.log('dumping story');
            let json = dump(this.story);
        }
        // generate a random number between 0 and count
        let choice = Math.floor(Math.random() * count);
        printer.log("--------------------");
        printer.log('choice: ' + choice)
        printer.log("--------------------");
        return choice;
    },
    end: function() {
        this.plays = (this.plays | 0) + 1
    }
};

const END= -99;

let exhaustive_player = {
    name: 'exhaustive_player',
    all_paths: [],
    choice: 0,
    reset: function(story) {
        this.position = this.all_paths;
        this.story = story;
    },
    choose: function(count, printer) {
        let next = 0;

        while (this.position[next] === [END]) {
            next++;
        }

        this.position[next] = [0];

        printer.log('choice: ' + next)
        console.log('choice: ' + next)
        return next;
    },
    end: function() {
        this.plays = (this.plays | 0) + 1
    }
};

function dump(story) {
    let json = story.state.ToJson(true);
    console.log(json);
    return json;
}

function run_story(player, printer) {
    const myStory = new Story(inkFile);

    player.reset(myStory);

    continueToNextChoice();

    function continueToNextChoice() {
        //check we haven't reached the end of the story
        if (!myStory.canContinue && myStory.currentChoices.length === 0) end();

        //write the story to the console until we find a choice
        while (myStory.canContinue) {
            printer.log(myStory.Continue());
        }

        //check if there are choices
        if (myStory.currentChoices.length > 0) {
            for (let i = 0; i < myStory.currentChoices.length; ++i) {
                const choice = myStory.currentChoices[i];
                printer.log((i + 1) + ". " + choice.text);
            }

            let made_choice = player.choose(myStory.currentChoices.length, printer);
            myStory.ChooseChoiceIndex(made_choice);
            continueToNextChoice();
        } else {
            //if there are no choices, we reached the end of the story
            end(printer);
            player.end();
        }
    }
}

let player = random_player;
let printer = null_printer; //console_printer;
// for(let i = 0; i < 10; i++) {
    run_story(player, printer);
    run_story(player, printer);
    run_story(player, printer);
// }

console.log(`played ${exhaustive_player.plays} times`);

function end(printer){
    printer.log('THE END');
}