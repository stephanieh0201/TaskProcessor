import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface CustomerDocument extends mongoose.Document {
  _id: string;
  taskMinSeconds: number;
  taskMaxSeconds: number;
}

export interface CustomerList {
  customers: CustomerDocument[];
}

const customerSchema = new Schema({
  taskMinSeconds: Number,
  taskMaxSeconds: Number,
});

export const customerMongooseModel = mongoose.model<CustomerDocument>('Customer', customerSchema);