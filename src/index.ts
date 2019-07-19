import TaskProcessor from './components/task/TaskProcessor';
import Config from './Config';
import FirstInFirstOutTaskPickingAlgorithm from './components/processingAlgorithm/FirstInFirstOutTaskPickingAlgorithm';
import RandomNumberGenerator from './components/helpers/RandomNumberGenerator';
import RoundRobinTaskPickingAlgorithm from './components/processingAlgorithm/RoundRobinTaskPickingAlgorithm';
import BalancedRoundRobinTaskPickingAlgorithm
  from './components/processingAlgorithm/BalancedRoundRobinTaskPickingAlgorithm';
import AbstractTaskPickingAlgorithm from './components/processingAlgorithm/AbstractTaskPickingAlgorithm';
import ProgramExiter from './components/helpers/ProgramExiter';
import { taskData } from './data/taskData';
import { customerData } from './data/customerData';

const startProgram = async () => {
  const todoTaskDocuments = taskData.items;
  const customerDocuments = customerData.customers;

  const randomNumberGenerator = new RandomNumberGenerator();

  let processingAlgorithm: AbstractTaskPickingAlgorithm;

  if (process.argv[2] === 'round') {
    processingAlgorithm = new RoundRobinTaskPickingAlgorithm(todoTaskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  } else if (process.argv[2] === 'balanced') {
    processingAlgorithm = new BalancedRoundRobinTaskPickingAlgorithm(todoTaskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  } else {
    processingAlgorithm = new FirstInFirstOutTaskPickingAlgorithm(todoTaskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  }

  const taskProcessor = new TaskProcessor(processingAlgorithm, new ProgramExiter(), Config.MAX_TASKS_PROCESSING);

  taskProcessor.run();
};

startProgram();
