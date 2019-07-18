import { Task, TaskList } from '../task/Task';
import { Customer } from '../customer/Customer';
import RandomNumberGenerator from './RandomNumberGenerator';

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

  public abstract moveNextTaskToProcessing(): void;
  protected abstract removeTaskFromProcessing(task: Task): void;

  protected processingListSize(): number {
    return Object.keys(this.processingList).length;
  }

  protected processTask(task: Task): void {
    setTimeout(() => this.removeTaskFromProcessing(task), task.timeToProcess * 1000);
  }
  protected sortList(): void {
    this.todoList.sort((firstTask: Task, secondTask: Task) => {
      if (firstTask.insertedTime < secondTask.insertedTime) {
        return -1;
      }
      if (firstTask.insertedTime > secondTask.insertedTime) {
        return 1;
      }
      return 0;
    });
  }
}
