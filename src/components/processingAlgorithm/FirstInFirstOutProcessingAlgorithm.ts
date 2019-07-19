import { Task } from '../task/Task';
import { Customer } from '../customer/Customer';
import RandomNumberGenerator from '../helpers/RandomNumberGenerator';
import AbstractProcessingAlgorithm from './AbstractProcessingAlgorithm';

export default class FirstInFirstOutProcessingAlgorithm extends AbstractProcessingAlgorithm {
  public constructor(todoList: Task[],
                     maxProcessingListSize: number,
                     customerList: Customer[],
                     randomNumberGenerator: RandomNumberGenerator) {
    super(todoList, maxProcessingListSize, customerList, randomNumberGenerator);
    this.sortLists();
  }

  public moveNextTaskToProcessing(): Task {
    if (this.todoList.length > 0 && this.processingListSize() < this.maxProcessingListSize) {
      const task     = this.todoList.shift();
      const customer = this.customerList.find((customer: Customer) => {
        return customer._id === task.customerId;
      });

      task.timeToProcess = this.randomNumberGenerator.execute(customer.taskMinSeconds, customer.taskMaxSeconds);

      this.processingList[task._id] = task;

      console.log(`Added task to processing: ${task._id}`);
      this.outputListSizes();

      this.processTask(task);

      return task;
    }
  }

  protected removeTaskFromProcessing(task: Task): void {
    delete this.processingList[task._id];
    task.insertedTime  = new Date().toString();
    task.timeToProcess = null;

    this.todoList.push(task);
    console.log(`Removed task from processing: ${task._id}`);
    this.outputListSizes();

    this.moveNextTaskToProcessing();
  }

  protected todoListSize(): number {
    return this.todoList.length;
  }
}
