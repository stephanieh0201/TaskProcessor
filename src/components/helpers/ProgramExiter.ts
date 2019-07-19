import AbstractTaskPickingAlgorithm from '../processingAlgorithm/AbstractTaskPickingAlgorithm';

export default class ProgramExiter {
  private processingAlgorithm: AbstractTaskPickingAlgorithm;

  public constructor(processingAlgorithm: AbstractTaskPickingAlgorithm) {
    this.processingAlgorithm = processingAlgorithm;
  }

  public await(): void {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', () => {
      console.log('terminating');
      // console.log(this.processingAlgorithm.getProcessingList());
      process.exit();
    });
  }
}