import TaskProcessor from './components/task/TaskProcessor';
import Config from './Config';
import FirstInFirstOutProcessingAlgorithm from './components/processingAlgorithm/FirstInFirstOutProcessingAlgorithm';
import RandomNumberGenerator from './components/processingAlgorithm/RandomNumberGenerator';
import RoundRobinProcessingAlgorithm from './components/processingAlgorithm/RoundRobinProcessingAlgorithm';
import BalancedRoundRobinProcessingAlgorithm
  from './components/processingAlgorithm/BalancedRoundRobinProcessingAlgorithm';
import AbstractProcessingAlgorithm from './components/processingAlgorithm/AbstractProcessingAlgorithm';
import ProgramExiter from './components/processingAlgorithm/ProgramExiter';
import { mockList } from './mockData/mockList';
import { mockCustomers } from './mockData/mockCustomers';

const startProgram = async () => {
  const taskDocuments = mockList.items;
  const customerDocuments = mockCustomers.customers;
  const randomNumberGenerator = new RandomNumberGenerator();

  let processingAlgorithm: AbstractProcessingAlgorithm;

  if (process.argv[2] === 'round') {
    processingAlgorithm = new RoundRobinProcessingAlgorithm(taskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  } else if (process.argv[2] === 'balanced') {
    processingAlgorithm = new BalancedRoundRobinProcessingAlgorithm(taskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  } else {
    processingAlgorithm = new FirstInFirstOutProcessingAlgorithm(taskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  }

  const taskProcessor = new TaskProcessor(processingAlgorithm, new ProgramExiter(), Config.MAX_TASKS_PROCESSING);

  taskProcessor.execute();
};

startProgram();
