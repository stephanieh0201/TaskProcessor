import { Task } from '../task/Task';
import { Customer } from '../customer/Customer';
import RandomNumberGenerator from '../helpers/RandomNumberGenerator';
import AbstractTaskPickingAlgorithm from './AbstractTaskPickingAlgorithm';

export default class RoundRobinTaskPickingAlgorithm extends AbstractTaskPickingAlgorithm {
  private todoListPerCustomer: Record<string, Task[]> = {};
  private currentCustomerIndex                        = 0;
  private customerIds: string[];

  public constructor(todoList: Task[],
                     maxProcessingListSize: number,
                     customerList: Customer[],
                     randomNumberGenerator: RandomNumberGenerator) {
    super(todoList, maxProcessingListSize, customerList, randomNumberGenerator);
    this.sortListByCustomer();
  }

  public selectNextTaskToProcess(): Task | undefined {
    return this.selectTaskForCustomer(this.customerIds[this.currentCustomerIndex]);
  }

  public removeTaskFromProcessing(task: Task): Task {
    delete this.processingList[task._id];

    console.log(`Removed from processing for customer: ${task.customerId}`);
    this.outputListSizes();

    task.insertedTime  = new Date().toString();
    task.timeToProcess = null;

    this.todoListPerCustomer[task.customerId].push(task);

    return task;
  }

  private selectTaskForCustomer(customerId: string): Task | undefined {
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

      return task;
    }
    return;
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
