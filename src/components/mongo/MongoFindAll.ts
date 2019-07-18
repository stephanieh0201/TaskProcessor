// import mongoose from 'mongoose';
import { taskMongooseModel } from '../task/Task';
import TaskEntityFactory from '../task/TaskEntityFactory';
import * as mongoose from 'mongoose';

export default class MongoFindAll<T extends mongoose.Document> {
  private readonly taskEntityFactory: TaskEntityFactory;
  private readonly model: mongoose.Model<T>;
  public constructor(model: mongoose.Model<T>) {
    this.model = model;
  }
  public async execute(): Promise<T[]> {
    return await this.model.find();
  }
}

// export default class MongoFindAll<T extends mongoose.Document> {
//   private readonly taskEntityFactory: TaskEntityFactory;
//   private readonly model: mongoose.Model<T>;
//   public constructor(taskEntityFactory: TaskEntityFactory) {
//     this.taskEntityFactory = taskEntityFactory;
//   }
//   public async findAll(): Promise<any[]> {
//     const taskDocuments: mongoose.Model<T> = await taskMongooseModel.find();
//
//     return taskDocuments.map(document => {
//       return this.taskEntityFactory.create(document._id, document.)
//     });
//   }
// }