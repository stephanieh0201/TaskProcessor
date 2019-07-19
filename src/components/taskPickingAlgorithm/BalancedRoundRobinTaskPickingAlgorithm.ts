import { Task } from '../task/Task';
import { Customer } from '../customer/Customer';
import RandomNumberGenerator from '../helpers/RandomNumberGenerator';
import AbstractTaskPickingAlgorithm from './AbstractTaskPickingAlgorithm';

export default class BalancedRoundRobinTaskPickingAlgorithm extends AbstractTaskPickingAlgorithm {
  private todoListPerCustomer: Record<string, Task[]>           = {};
  private processingListSizePerCustomer: Record<string, number> = {};

  public constructor(todoList: Task[],
                     maxProcessingListSize: number,
                     customerList: Customer[],
                     randomNumberGenerator: RandomNumberGenerator) {
    super(todoList, maxProcessingListSize, customerList, randomNumberGenerator);
    this.sortListByCustomer();
  }

  public selectNextTaskToProcess(): Task | undefined {
    let nextCustomerId;
    let minTasks = this.maxProcessingListSize;

    Object.keys(this.processingListSizePerCustomer).forEach(customerId => {
      if (this.processingListSizePerCustomer[customerId] < minTasks) {
        nextCustomerId = customerId;
        minTasks       = this.processingListSizePerCustomer[customerId];
      }
    });

    if (!nextCustomerId) {
      return;
    }

    return this.selectTaskAndStartProcessForCustomer(nextCustomerId);
  }

  public removeTaskFromProcessing(task: Task): Task {
    delete this.processingList[task._id];
    this.processingListSizePerCustomer[task.customerId] -= 1;

    task.insertedTime  = new Date().toString();
    task.timeToProcess = null;

    this.todoListPerCustomer[task.customerId].push(task);

    console.log(`Removed from processing for customer: ${task.customerId}`);
    console.log('Tasks processing per customer ID:');
    console.log(this.processingListSizePerCustomer);
    this.outputListSizes();

    return task;
  }

  private selectTaskAndStartProcessForCustomer(customerId: string): Task | undefined {
    if (this.todoListPerCustomer[customerId].length > 0 && this.processingListSize() < this.maxProcessingListSize) {
      const task     = this.todoListPerCustomer[customerId].shift();
      const customer = this.customerList.find(customer => {
        return customer._id === customerId;
      });

      task.timeToProcess = this.randomNumberGenerator.execute(customer.taskMinSeconds, customer.taskMaxSeconds);

      this.processingListSizePerCustomer[customerId] = this.processingListSizePerCustomer[customerId] ? this.processingListSizePerCustomer[customerId] + 1 : 1;

      this.processingList[task._id] = task;

      console.log(`Added to processing for customer: ${customerId}`);
      console.log('Tasks processing per customer ID:');
      console.log(this.processingListSizePerCustomer);
      this.outputListSizes();

      return task;
    }
    return;
  }

  private sortListByCustomer(): void {
    this.sortLists();

    this.customerList.forEach(customer => {
      this.todoListPerCustomer[customer._id]           = [];
      this.processingListSizePerCustomer[customer._id] = 0;
    });

    this.todoList.forEach(task => {
      this.todoListPerCustomer[task.customerId].push(task);
    });
  }

  protected todoListSize(): number {
    let size = 0;

    Object.keys(this.todoListPerCustomer).forEach(customerId => size += this.todoListPerCustomer[customerId].length);

    return size;
  }
}
