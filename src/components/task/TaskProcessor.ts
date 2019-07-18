import Config from '../../Config';
import AbstractProcessingAlgorithm from '../processingAlgorithm/AbstractProcessingAlgorithm';

export default class TaskProcessor {
  private processingAlgorithm: AbstractProcessingAlgorithm;

  public constructor(processingAlgorithm: AbstractProcessingAlgorithm) {
    this.processingAlgorithm = processingAlgorithm;
  }

  public run(): void {
    for (let i = 0; i < Config.MAX_TASKS_PROCESSING; i++) {
      this.processingAlgorithm.moveNextTaskToProcessing();
    }
  }
}
