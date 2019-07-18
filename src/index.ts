import TaskProcessor from './components/task/TaskProcessor';
import Config from './Config';
import FirstInFirstOutProcessingAlgorithm from './components/processingAlgorithm/FirstInFirstOutProcessingAlgorithm';
import RandomNumberGenerator from './components/processingAlgorithm/RandomNumberGenerator';
import RoundRobinProcessingAlgorithm from './components/processingAlgorithm/RoundRobinProcessingAlgorithm';
import BalancedRoundRobinProcessingAlgorithm
  from './components/processingAlgorithm/BalancedRoundRobinProcessingAlgorithm';
import AbstractProcessingAlgorithm from './components/processingAlgorithm/AbstractProcessingAlgorithm';
import ProgramExiter from './components/processingAlgorithm/ProgramExiter';
import mongoose from 'mongoose';
import { taskMongooseModel } from './components/task/Task';
import { customerMongooseModel } from './components/customer/Customer';
import MongoFindAll from './components/mongo/MongoFindAll';

const startProgram = async () => {
  const url = Config.MONGO_URL;
  let mongooseInstance: mongoose.Mongoose;

  try {
    mongooseInstance = await mongoose.connect(url, {
      useNewUrlParser: true,
      dbName: Config.MONGO_DATABASE,
    });
  } catch (error) {
    console.error('Error connecting to MongoDB');
    console.error(error);
    throw error;
  }

  const connection = mongooseInstance.connection;

  connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

  const taskDocuments     = await new MongoFindAll(taskMongooseModel).execute();
  const customerDocuments = await new MongoFindAll(customerMongooseModel).execute();

  const randomNumberGenerator = new RandomNumberGenerator();

  let processingAlgorithm: AbstractProcessingAlgorithm;

  if (process.argv[2] === 'round') {
    processingAlgorithm = new RoundRobinProcessingAlgorithm(taskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  } else if (process.argv[2] === 'balanced') {
    processingAlgorithm = new BalancedRoundRobinProcessingAlgorithm(taskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  } else {
    processingAlgorithm = new FirstInFirstOutProcessingAlgorithm(taskDocuments, Config.MAX_TASKS_PROCESSING, customerDocuments, randomNumberGenerator);
  }

  const taskProcessor = new TaskProcessor(processingAlgorithm, new ProgramExiter());

  taskProcessor.execute();
};

startProgram();
