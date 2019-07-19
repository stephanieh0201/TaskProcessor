import TaskProcessor from './components/task/TaskProcessor';
import Config from './Config';
import FirstInFirstOutProcessingAlgorithm from './components/processingAlgorithm/FirstInFirstOutProcessingAlgorithm';
import RandomNumberGenerator from './components/helpers/RandomNumberGenerator';
import RoundRobinProcessingAlgorithm from './components/processingAlgorithm/RoundRobinProcessingAlgorithm';
import BalancedRoundRobinProcessingAlgorithm
  from './components/processingAlgorithm/BalancedRoundRobinProcessingAlgorithm';
import AbstractProcessingAlgorithm from './components/processingAlgorithm/AbstractProcessingAlgorithm';
import ProgramExiter from './components/helpers/ProgramExiter';
import { taskData } from './data/taskData';
import { customerData } from './data/customerData';

const startProgram = async () => {
  const todoTaskDocuments = taskData.items;
  const customerDocuments = customerData.customers;

  const randomNumberGenerator = new RandomNumberGenerator();

  let processingAlgorithm: AbstractProcessingAlgorithm;

  if (process.argv[2] === 'round') {
    processingAlgorithm = new RoundRobinProcessingAlgorithm(todoTaskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  } else if (process.argv[2] === 'balanced') {
    processingAlgorithm = new BalancedRoundRobinProcessingAlgorithm(todoTaskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  } else {
    processingAlgorithm = new FirstInFirstOutProcessingAlgorithm(todoTaskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  }

  const taskProcessor = new TaskProcessor(processingAlgorithm, new ProgramExiter(), Config.MAX_TASKS_PROCESSING);

  taskProcessor.execute();
};

startProgram();
