import { Task } from '../task/Task';
import { Customer } from '../customer/Customer';
import RandomNumberGenerator from './RandomNumberGenerator';
import AbstractProcessingAlgorithm from './AbstractProcessingAlgorithm';

export default class RoundRobinProcessingAlgorithm extends AbstractProcessingAlgorithm {
  private todoListPerCustomer: Record<string, Task[]> = {};
  private customerIds: string[];
  private currentCustomerIndex                        = 0;

  public constructor(todoList: Task[],
                     maxProcessingListSize: number,
                     customerList: Customer[],
                     randomNumberGenerator: RandomNumberGenerator) {
    super(todoList, maxProcessingListSize, customerList, randomNumberGenerator);
    this.sortListByCustomer();
  }

  public moveNextTaskToProcessing(): void {
    this.selectTaskAndStartProcessForCustomer(this.customerIds[this.currentCustomerIndex]);
  }

  private selectTaskAndStartProcessForCustomer(customerId: string): void {
    if (this.todoListPerCustomer[customerId].length > 0 && this.processingListSize() < this.maxProcessingListSize) {
      this.setNextCustomer();

      const task     = this.todoListPerCustomer[customerId].shift();
      const customer = this.customerList.find(customer => {
        return customer._id === customerId;
      });

      task.timeToProcess            = this.randomNumberGenerator.execute(customer.taskMinSeconds, customer.taskMaxSeconds);
      this.processingList[task._id] = task;

      console.log(`Added to processing for customer: ${customerId}`);
      this.outputListSizes();

      this.processTask(task);
    }
  }

  protected removeTaskFromProcessing(task: Task): void {
    delete this.processingList[task._id];
    console.log(`Removed from processing for customer: ${task.customerId}`);
    this.outputListSizes();
    task.insertedTime  = new Date().toString();
    task.timeToProcess = null;

    this.todoListPerCustomer[task.customerId].push(task);

    this.moveNextTaskToProcessing();
  }

  private setNextCustomer(): void {
    this.currentCustomerIndex = this.currentCustomerIndex + 1;
    if (this.currentCustomerIndex === this.customerIds.length) {
      this.currentCustomerIndex = 0;
    }
  }

  private sortListByCustomer(): void {
    this.sortLists();

    this.customerList.forEach(customer => {
      this.todoListPerCustomer[customer._id] = [];
    });

    this.customerIds = Object.keys(this.todoListPerCustomer);

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
