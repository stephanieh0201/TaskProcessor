import { mockList } from '../helpers/mockTasks';
import { mockCustomers } from '../helpers/mockCustomers';
import RandomNumberGenerator from '../../src/components/helpers/RandomNumberGenerator';
import RoundRobinProcessingAlgorithm from '../../src/components/processingAlgorithm/RoundRobinProcessingAlgorithm';

describe('A RoundRobinProcessingAlgorithm', () => {
  const randomNumberGeneratorMock = {} as RandomNumberGenerator;

  describe('Moving next task to processing', () => {
    describe('Successfully with items in todo list', () => {
      const roundRobinProcessingAlgorithm = new RoundRobinProcessingAlgorithm(
        mockList.items,
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;

      beforeAll(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = roundRobinProcessingAlgorithm.moveNextTaskToProcessing();
      });

      it('Returns task: customer 1', () => {
        expect(result.customerId).toBe('1');
      });

      it('Returns task: id 13', () => {
        expect(result._id).toBe('13');
      });
    });

    describe('Successfully without items in todo list', () => {
      const roundRobinProcessingAlgorithm = new RoundRobinProcessingAlgorithm(
        [],
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;

      beforeAll(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = roundRobinProcessingAlgorithm.moveNextTaskToProcessing();
      });

      it('Returns undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });
});
