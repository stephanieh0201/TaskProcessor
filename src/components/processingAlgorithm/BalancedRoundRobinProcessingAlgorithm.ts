import { Task } from '../task/Task';
import { Customer } from '../customer/Customer';
import RandomNumberGenerator from './RandomNumberGenerator';
import AbstractProcessingAlgorithm from './AbstractProcessingAlgorithm';

export default class BalancedRoundRobinProcessingAlgorithm extends AbstractProcessingAlgorithm {
  private todoListPerCustomer: Record<string, Task[]> = {};

  private processingListSizePerCustomer: Record<string, number> = {};

  public constructor(todoList: Task[],
                     maxProcessingListSize: number,
                     customerList: Customer[],
                     randomNumberGenerator: RandomNumberGenerator) {
    super(todoList, maxProcessingListSize, customerList, randomNumberGenerator);
    this.sortListByCustomer();
  }

  public moveNextTaskToProcessing(): void {
    Object.keys(this.todoListPerCustomer).forEach(customerId => {
      this.selectTaskAndStartProcessForCustomer(customerId);
    });
  }

  private selectTaskAndStartProcessForCustomer(customerId: string): void {
    if (this.todoListPerCustomer[customerId].length > 0 && this.processingListSize() < this.maxProcessingListSize) {
      const task     = this.todoListPerCustomer[customerId].shift();
      const customer = this.customerList.find(customer => {
        return customer._id === customerId;
      });

      task.timeToProcess = this.randomNumberGenerator.execute(customer.taskMinSeconds, customer.taskMaxSeconds);

      this.processingListSizePerCustomer[customerId] = this.processingListSizePerCustomer[customerId] ? this.processingListSizePerCustomer[customerId] + 1 : 1;

      this.processingList[task._id] = task;

      console.log('Tasks per customer ID:');
      console.log(this.processingListSizePerCustomer);

      this.processTask(task);
      // setTimeout(() => this.removeTaskFromProcessing(task), task.timeToProcess * 1000);
    }
  }

  protected removeTaskFromProcessing(task: Task): void {
    delete this.processingList[task._id];
    this.processingListSizePerCustomer[task.customerId] -= 1;

    task.insertedTime  = new Date().toString();
    task.timeToProcess = null;

    this.todoListPerCustomer[task.customerId].push(task);

    let nextCustomerId = task.customerId;
    let minTasks       = this.maxProcessingListSize;

    Object.keys(this.processingListSizePerCustomer).forEach(customerId => {
      if (this.processingListSizePerCustomer[customerId] < minTasks) {
        nextCustomerId = customerId;
        minTasks       = this.processingListSizePerCustomer[customerId];
      }
    });

    this.selectTaskAndStartProcessForCustomer(nextCustomerId);
  }

  private sortListByCustomer(): void {
    this.sortList();

    this.customerList.forEach(customer => {
      this.todoListPerCustomer[customer._id] = [];
    });

    this.todoList.forEach(task => {
      this.todoListPerCustomer[task.customerId].push(task);
    });
  }

}
