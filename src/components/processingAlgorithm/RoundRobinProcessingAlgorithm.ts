import { Task } from '../task/Task';
import { Customer } from '../customer/Customer';
import RandomNumberGenerator from './RandomNumberGenerator';
import AbstractProcessingAlgorithm from './AbstractProcessingAlgorithm';

export default class RoundRobinProcessingAlgorithm extends AbstractProcessingAlgorithm {
  private todoListPerCustomer: Record<string, Task[]> = {};

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
      console.log(`adding for customer ${customerId}`);
      this.processingList[task._id] = task;

      this.processTask(task);
    }
  }

  protected removeTaskFromProcessing(task: Task): void {
    delete this.processingList[task._id];
    console.log(`removing for ${task.customerId}`);
    task.insertedTime  = new Date().toString();
    task.timeToProcess = null;

    this.todoListPerCustomer[task.customerId].push(task);

    this.selectTaskAndStartProcessForCustomer(task.customerId);
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
