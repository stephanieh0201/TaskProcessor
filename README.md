# Task Processor

## About
This task processor will read in tasks from a todo list and process them. There are 
three algorithms that will process the tasks in different orders depending on which
algorithm is selected.

#### First In First Out

#### Round Robin

#### Balanced Round Robin

## Setup
#### Requirements
- Install node (https://nodejs.org)
#### Installation
- `git clone https://github.com/sverlingo/TaskProcessor`
- Run `npm install` from the root directory

## Running the program
To run the program with each algorithm use the following commands:

#### First In First Out
- `npm run start fifo`

#### Round Robin
- `npm run start round`

#### Balanced Round Robin
- `npm run start balanced`

The task processor will run continuously, it can be stopped at any time by pressing any key and restarted with the above 
commands.

## Unit Tests
Unit tests are run with jasmine and test coverage is provided by nyc.

To run the tests:
- `npm run test`

This will output a summary of test coverage in the console, and also create a 
html document in `/coverage/index.html`. You can view this html document to see 
which lines are covered by testing.