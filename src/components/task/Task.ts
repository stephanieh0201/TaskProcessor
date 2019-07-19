export interface Task {
  _id: string;
  customerId: string;
  insertedTime: string;
  timeToProcess?: number;
}

export type TaskList = Record<string, Task>;
