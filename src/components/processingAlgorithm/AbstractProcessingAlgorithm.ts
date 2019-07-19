import { Task, TaskList } from '../task/Task';
import { Customer } from '../customer/Customer';
import RandomNumberGenerator from '../helpers/RandomNumberGenerator';

export default abstract class AbstractProcessingAlgorithm {
  protected todoList: Task[];
  protected maxProcessingListSize: number;
  protected customerList: Customer[];
  protected randomNumberGenerator: RandomNumberGenerator;
  protected processingList: TaskList = {};

  public constructor(todoList: Task[],
                     maxProcessingListSize: number,
                     customerList: Customer[],
                     randomNumberGenerator: RandomNumberGenerator) {
    this.todoList              = todoList;
    this.maxProcessingListSize = maxProcessingListSize;
    this.customerList          = customerList;
    this.randomNumberGenerator = randomNumberGenerator;
  }

  public abstract moveNextTaskToProcessing(): Task | Task[];

  protected abstract removeTaskFromProcessing(task: Task): void;

  protected processingListSize(): number {
    return Object.keys(this.processingList).length;
  }

  protected outputListSizes(): void {
    console.log(`Processing list size: ${this.processingListSize()}`);
    console.log(`Todo list size: ${this.todoListSize()}`);
    console.log('Press any key to exit');
    console.log('---------------------');
  }

  protected abstract todoListSize(): number;

  protected processTask(task: Task): void {
    setTimeout(() => this.removeTaskFromProcessing(task), task.timeToProcess * 1000);
  }

  protected sortLists(): void {
    this.todoList.sort((firstTask, secondTask) => {
      if (firstTask.insertedTime < secondTask.insertedTime) {
        return -1;
      }
      if (firstTask.insertedTime > secondTask.insertedTime) {
        return 1;
      }
      return 0;
    });

    this.customerList.sort((firstCustomer, secondCustomer) => {
      if (firstCustomer._id < secondCustomer._id) {
        return -1;
      }
      return 1;
    });
  }
}
