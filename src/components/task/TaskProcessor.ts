import AbstractTaskPickingAlgorithm from '../processingAlgorithm/AbstractTaskPickingAlgorithm';
import ProgramExiter from '../helpers/ProgramExiter';
import { Task } from './Task';

export default class TaskProcessor {
  private processingAlgorithm: AbstractTaskPickingAlgorithm;
  private programExiter: ProgramExiter;
  private maxProcessingListSize: number;

  public constructor(processingAlgorithm: AbstractTaskPickingAlgorithm,
                     programExiter: ProgramExiter,
                     maxProcessingListSize: number) {
    this.processingAlgorithm   = processingAlgorithm;
    this.programExiter         = programExiter;
    this.maxProcessingListSize = maxProcessingListSize;
  }

  public run(): void {
    this.programExiter.await();

    for (let i = 0; i < this.maxProcessingListSize; i++) {
      const task = this.processingAlgorithm.selectNextTaskToProcess();
      if (task) {
        this.processTask(task);
      }
    }
  }

  private processTask(task: Task) {
    setTimeout(() => {
      this.processingAlgorithm.removeTaskFromProcessing(task);

      const nextTask = this.processingAlgorithm.selectNextTaskToProcess();

      if (nextTask) {
        this.processTask(nextTask);
      }
    },         task.timeToProcess * 1000);
  }
}
