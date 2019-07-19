import { mockList } from '../../helpers/mockTasks';
import { mockCustomers } from '../../helpers/mockCustomers';
import RandomNumberGenerator from '../../../src/components/helpers/RandomNumberGenerator';
import RoundRobinTaskPickingAlgorithm from '../../../src/components/processingAlgorithm/RoundRobinTaskPickingAlgorithm';

describe('A RoundRobinTaskPickingAlgorithm', () => {
  const randomNumberGeneratorMock = {} as RandomNumberGenerator;

  describe('Moving next task to processing', () => {
    describe('Successfully with items in todo list', () => {
      const roundRobinTaskPickingAlgorithm = new RoundRobinTaskPickingAlgorithm(
        mockList.items,
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;

      beforeAll(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = roundRobinTaskPickingAlgorithm.selectNextTaskToProcess();
      });

      it('Returns task: customer 1', () => {
        expect(result.customerId).toBe('1');
      });

      it('Returns task: id 13', () => {
        expect(result._id).toBe('13');
      });
    });

    describe('Successfully without items in todo list', () => {
      const roundRobinTaskPickingAlgorithm = new RoundRobinTaskPickingAlgorithm(
        [],
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;

      beforeAll(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = roundRobinTaskPickingAlgorithm.selectNextTaskToProcess();
      });

      it('Returns undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('Removing task from processing', () => {
    describe('Successfully', () => {
      const roundRobinTaskPickingAlgorithm = new RoundRobinTaskPickingAlgorithm(
        [ {_id: '1', customerId: '1', insertedTime: new Date().toString()} ],
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;
      let task;
      beforeEach(() => {
        randomNumberGeneratorMock.execute = () => 2;

        task   = roundRobinTaskPickingAlgorithm.selectNextTaskToProcess();
        result = roundRobinTaskPickingAlgorithm.removeTaskFromProcessing(task);
      });

      it('Returns removed task', () => {
        expect(result._id).toBe('1');
      });
    });
  });
});
