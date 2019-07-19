import ProgramExiter from '../../../src/components/helpers/ProgramExiter';
import TaskProcessor from '../../../src/components/task/TaskProcessor';
import AbstractTaskPickingAlgorithm from '../../../src/components/taskPickingAlgorithm/AbstractTaskPickingAlgorithm';
import { Task } from '../../../src/components/task/Task';

describe('A TaskProcessor', () => {
  const programmExiterMock      = {} as ProgramExiter;
  const processingAlgorithmMock = {} as AbstractTaskPickingAlgorithm;

  const taskProcessor = new TaskProcessor(processingAlgorithmMock, programmExiterMock, 10);

  describe('Executing', () => {
    describe('Successfully', () => {
      let result;

      beforeEach(() => {
        programmExiterMock.await                         = () => (void 0);
        processingAlgorithmMock.selectNextTaskToProcess  = () => ({}) as Task;
        processingAlgorithmMock.removeTaskFromProcessing = () => ({}) as Task;

        result = taskProcessor.run();
      });

      it('Runs', () => {
        expect(result).toBe(void 0);
      });
    });
  });
});
