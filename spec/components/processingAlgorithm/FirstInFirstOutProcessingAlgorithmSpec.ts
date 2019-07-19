import { mockList } from '../../helpers/mockTasks';
import { mockCustomers } from '../../helpers/mockCustomers';
import RandomNumberGenerator from '../../../src/components/helpers/RandomNumberGenerator';
import FirstInFirstOutTaskPickingAlgorithm
  from '../../../src/components/processingAlgorithm/FirstInFirstOutTaskPickingAlgorithm';

describe('A FirstInFirstOutTaskPickingAlgorithm', () => {
  const randomNumberGeneratorMock = {} as RandomNumberGenerator;

  describe('Moving next task to processing', () => {
    describe('Successfully with items in todo list', () => {
      const list = mockList;
      console.log(list.items.length);

      const firstInFirstOutTaskPickingAlgorithm = new FirstInFirstOutTaskPickingAlgorithm(
        list.items,
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;

      beforeEach(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = firstInFirstOutTaskPickingAlgorithm.selectNextTaskToProcess();
      });

      it('Returns next task', () => {
        expect(result._id).toBe('13');
      });
    });

    describe('Successfully without items in todo list', () => {
      const firstInFirstOutTaskPickingAlgorithm = new FirstInFirstOutTaskPickingAlgorithm(
        [],
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;

      beforeEach(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = firstInFirstOutTaskPickingAlgorithm.selectNextTaskToProcess();
      });

      it('Returns undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });
  describe('Removing task from processing', () => {
    describe('Successfully', () => {
      const firstInFirstOutTaskPickingAlgorithm = new FirstInFirstOutTaskPickingAlgorithm(
        [ {_id: '1', customerId: '1', insertedTime: new Date().toString() }],
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;
      let task;
      beforeEach(() => {
        randomNumberGeneratorMock.execute = () => 2;

        task   = firstInFirstOutTaskPickingAlgorithm.selectNextTaskToProcess();
        result = firstInFirstOutTaskPickingAlgorithm.removeTaskFromProcessing(task);
      });

      it('Returns removed task', () => {
        expect(result._id).toBe('1');
      });
    });
  });
});
