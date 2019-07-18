import FirstInFirstOutProcessingAlgorithm
  from '../../src/components/processingAlgorithm/FirstInFirstOutProcessingAlgorithm';
import { mockList } from '../../src/mockData/mockList';
import { mockCustomers } from '../../src/mockData/mockCustomers';
import RandomNumberGenerator from '../../src/components/processingAlgorithm/RandomNumberGenerator';

describe('A RandomNumberGenerator', () => {
  const randomNumberGenerator = new RandomNumberGenerator();

  describe('Executing', () => {
    const min = 0;
    const max = 10;
    describe('Successfully', () => {
      let result;

      beforeEach(() => {
        result = randomNumberGenerator.execute(min, max);
      });

      it('Returns number gte 0', () => {
        expect(result).toBeGreaterThanOrEqual(0);
      });

      it('Returns number lte 10', () => {
        expect(result).toBeLessThanOrEqual(10);
      });
    });
  });
});
