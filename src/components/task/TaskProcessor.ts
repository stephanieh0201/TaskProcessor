import AbstractProcessingAlgorithm from '../processingAlgorithm/AbstractProcessingAlgorithm';
import ProgramExiter from '../processingAlgorithm/ProgramExiter';

export default class TaskProcessor {
  private processingAlgorithm: AbstractProcessingAlgorithm;
  private programExiter: ProgramExiter;
  private maxProcessingListSize: number;

  public constructor(processingAlgorithm: AbstractProcessingAlgorithm,
                     programExiter: ProgramExiter,
                     maxProcessingListSize: number) {
    this.processingAlgorithm   = processingAlgorithm;
    this.programExiter         = programExiter;
    this.maxProcessingListSize = maxProcessingListSize;
  }

  public execute(): void {
    this.programExiter.await();

    for (let i = 0; i < this.maxProcessingListSize; i++) {
      this.processingAlgorithm.moveNextTaskToProcessing();
    }
  }
}
