import RandomNumberGenerator from '../../../src/components/helpers/RandomNumberGenerator';
import BalancedRoundRobinTaskPickingAlgorithm
  from '../../../src/components/processingAlgorithm/BalancedRoundRobinTaskPickingAlgorithm';
import { mockList } from '../../helpers/mockTasks';
import { mockCustomers } from '../../helpers/mockCustomers';

describe('A BalancedRoundRobinTaskPickingAlgorithm', () => {
  const randomNumberGeneratorMock = {} as RandomNumberGenerator;

  describe('Moving next task to processing', () => {
    describe('Successfully with items in todo list', () => {
      const balancedRoundRobinTaskPickingAlgorithm = new BalancedRoundRobinTaskPickingAlgorithm(
        mockList.items,
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;

      beforeAll(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = balancedRoundRobinTaskPickingAlgorithm.selectNextTaskToProcess();
      });

      it('Returns first task: customer 1', () => {
        expect(result.customerId).toBe('1');
      });

      it('Returns first task: id 13', () => {
        expect(result._id).toBe('13');
      });

      // it('Returns second task: customer 2', () => {
      //   expect(result[1].customerId).toBe('2');
      // });
      //
      // it('Returns second task: id 5', () => {
      //   expect(result[1]._id).toBe('5');
      // });
      //
      // it('Returns third task: customer 3', () => {
      //   expect(result[2].customerId).toBe('3');
      // });
      //
      // it('Returns third task: id 12', () => {
      //   expect(result[2]._id).toBe('12');
      // });
    });

    describe('Successfully without items in todo list', () => {
      const balancedRoundRobinTaskPickingAlgorithm = new BalancedRoundRobinTaskPickingAlgorithm(
        [],
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;

      beforeAll(() => {
        randomNumberGeneratorMock.execute = () => 2;

        result = balancedRoundRobinTaskPickingAlgorithm.selectNextTaskToProcess();
      });

      it('Returns array of undefined', () => {
        expect(result).toBe(undefined);
        // expect(result[1]).toBe(undefined);
        // expect(result[2]).toBe(undefined);
      });
    });
  });

  describe('Removing task from processing', () => {
    describe('Successfully', () => {
      const balancedRoundRobinTaskPickingAlgorithm = new BalancedRoundRobinTaskPickingAlgorithm(
        [{ _id: '1', customerId: '1', insertedTime: new Date().toString() }],
        10,
        mockCustomers.customers,
        randomNumberGeneratorMock);

      let result;
      let task;
      beforeEach(() => {
        randomNumberGeneratorMock.execute = () => 2;

        task   = balancedRoundRobinTaskPickingAlgorithm.selectNextTaskToProcess();
        result = balancedRoundRobinTaskPickingAlgorithm.removeTaskFromProcessing(task);
      });

      it('Returns removed task', () => {
        expect(result._id).toBe('1');
      });
    });
  });
});
