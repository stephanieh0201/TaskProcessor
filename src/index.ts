import { mockList } from './mockData/mockList';
import TaskProcessor from './components/task/TaskProcessor';
import Config from './Config';
import { mockCustomers } from './mockData/mockCustomers';
import FirstInFirstOutProcessingAlgorithm from './components/processingAlgorithm/FirstInFirstOutProcessingAlgorithm';
import RandomNumberGenerator from './components/processingAlgorithm/RandomNumberGenerator';
import RoundRobinProcessingAlgorithm from './components/processingAlgorithm/RoundRobinProcessingAlgorithm';
import BalancedRoundRobinProcessingAlgorithm
  from './components/processingAlgorithm/BalancedRoundRobinProcessingAlgorithm';
import AbstractProcessingAlgorithm from './components/processingAlgorithm/AbstractProcessingAlgorithm';

const listData              = mockList;
const customerData          = mockCustomers;
const randomNumberGenerator = new RandomNumberGenerator();

let processingAlgorithm: AbstractProcessingAlgorithm = new FirstInFirstOutProcessingAlgorithm(listData.items, Config.MAX_TASKS_PROCESSING, customerData.customers, randomNumberGenerator);

if (process.argv[2] === 'round') {
  processingAlgorithm = new RoundRobinProcessingAlgorithm(listData.items, Config.MAX_TASKS_PROCESSING, customerData.customers, randomNumberGenerator);
} else if (process.argv[2] === 'balanced') {
  processingAlgorithm = new BalancedRoundRobinProcessingAlgorithm(listData.items, Config.MAX_TASKS_PROCESSING, customerData.customers, randomNumberGenerator);
}

const taskProcessor = new TaskProcessor(processingAlgorithm);

taskProcessor.run();
