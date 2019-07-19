# Task Processor

## About
This task processor will read in tasks from a todo list and process them. There are 
three algorithms that will process the tasks in different orders depending on which
algorithm is selected.

#### First In First Out
For this algorithm, tasks should be selected from the todo list simply based on their
insertedTime. The customer the tasks are associated with is not pertinent to the algorithm. 
The task chosen to be placed in the processing list should be the task with the earliest 
insertedTime of all todo tasks.

#### Round Robin
For this algorithm, tasks should be selected from the todo list based on the customer they 
are associated with. This should be done in a round robin fashion based on the customers. 
For example, if there are 3 customers, the first task is chosen for customer1, then a task 
for customer2, customer3, then back to customer1, and so on. When choosing a task narrowed 
down to a specific customer (e.g knowing that you are choosing a task for customer1), the 
task with the earliest insertedTime should be selected.

#### Balanced Round Robin
For this algorithm, tasks should be selected from the todo list based on the customer they
are associated with. This should be done in a round robin fashion based on the customers 
and the number of tasks currently in the processing list. The goal of this algorithm is to 
have the same number of tasks for each customer in the processing list at any time. This 
should be demonstrated by setting much higher values for  taskMinSeconds and taskMaxSeconds 
for a specific customer, and showing that tasks are still distributed evenly across all customers. 
One customer should not dominate the processing list.
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