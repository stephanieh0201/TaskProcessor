import FirstInFirstOutProcessingAlgorithm
  from '../../src/components/processingAlgorithm/FirstInFirstOutProcessingAlgorithm';
import { mockList } from '../helpers/mockTasks';
import { mockCustomers } from '../helpers/mockCustomers';
import RandomNumberGenerator from '../../src/components/helpers/RandomNumberGenerator';

describe('A FirstInFirstOutProcessingAlgorithm', () => {
  const randomNumberGeneratorMock = {} as RandomNumberGenerator;

  describe('Moving next task to processing', () => {
    describe('Successfully with items in todo list', () => {
      const firstInFirstOutProcessingAlgorithm = new FirstInFirstOutProcessingAlgorithm(
        mockList.items,
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;

      beforeEach(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = firstInFirstOutProcessingAlgorithm.moveNextTaskToProcessing();
      });

      it('Returns next task', () => {
        expect(result._id).toBe('13');
      });
    });

    describe('Successfully without items in todo list', () => {
      const firstInFirstOutProcessingAlgorithm = new FirstInFirstOutProcessingAlgorithm(
        [],
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;

      beforeEach(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = firstInFirstOutProcessingAlgorithm.moveNextTaskToProcessing();
      });

      it('Returns undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });
});
