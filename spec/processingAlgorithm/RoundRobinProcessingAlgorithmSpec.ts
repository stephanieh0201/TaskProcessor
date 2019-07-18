import { mockList } from '../../src/mockData/mockList';
import { mockCustomers } from '../../src/mockData/mockCustomers';
import RandomNumberGenerator from '../../src/components/processingAlgorithm/RandomNumberGenerator';
import RoundRobinProcessingAlgorithm from '../../src/components/processingAlgorithm/RoundRobinProcessingAlgorithm';

describe('A RoundRobinProcessingAlgorithm', () => {
  const randomNumberGeneratorMock = {} as RandomNumberGenerator;

  describe('Moving next task to processing', () => {
    describe('Successfully with items in todo list', () => {
      const roundRobinProcessingAlgorithm = new RoundRobinProcessingAlgorithm(mockList.items, 10, mockCustomers.customers, randomNumberGeneratorMock);

      let result;

      beforeAll(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = roundRobinProcessingAlgorithm.moveNextTaskToProcessing();
      });

      it('Returns first task: customer 1', () => {
        expect(result[0].customerId).toBe('1');
      });

      it('Returns first task: id 17', () => {
        expect(result[0]._id).toBe('17');
      });

      it('Returns second task: customer 2', () => {
        expect(result[1].customerId).toBe('2');
      });

      it('Returns second task: id 13', () => {
        expect(result[1]._id).toBe('13');
      });

      it('Returns third task: customer 3', () => {
        expect(result[2].customerId).toBe('3');
      });

      it('Returns third task: id 12', () => {
        expect(result[2]._id).toBe('12');
      });
    });

    describe('Successfully without items in todo list', () => {
      const roundRobinProcessingAlgorithm = new RoundRobinProcessingAlgorithm([], 10, mockCustomers.customers, randomNumberGeneratorMock);

      let result;

      beforeAll(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = roundRobinProcessingAlgorithm.moveNextTaskToProcessing();
      });

      it('Returns array of undefined', () => {
        expect(result[0]).toBe(undefined);
        expect(result[1]).toBe(undefined);
        expect(result[2]).toBe(undefined);
      });
    });
  });
});
