import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface TaskDocument extends mongoose.Document {
  _id: string;
  customerId: string;
  insertedTime: string;
  timeToProcess?: number;
}

export type TaskList = Record<string, TaskDocument>;

const taskSchema = new Schema({
  customerId: String,
  insertedTime: String,
  timeToProcess: Number,
});

export const taskMongooseModel = mongoose.model<TaskDocument>('Task', taskSchema);
