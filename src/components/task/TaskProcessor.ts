import Config from '../../Config';
import AbstractProcessingAlgorithm from '../processingAlgorithm/AbstractProcessingAlgorithm';
import ProgramExiter from '../processingAlgorithm/ProgramExiter';

export default class TaskProcessor {
  private processingAlgorithm: AbstractProcessingAlgorithm;
  private programExiter: ProgramExiter;

  public constructor(processingAlgorithm: AbstractProcessingAlgorithm,
                     programExiter: ProgramExiter) {
    this.processingAlgorithm = processingAlgorithm;
    this.programExiter = programExiter;
  }

  public execute(): void {
    this.programExiter.await();

    for (let i = 0; i < Config.MAX_TASKS_PROCESSING; i++) {
      this.processingAlgorithm.moveNextTaskToProcessing();
    }
  }
}
