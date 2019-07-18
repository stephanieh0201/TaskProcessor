export interface Customer {
  _id: string;
  taskMinSeconds: number;
  taskMaxSeconds: number;
}

export interface CustomerList {
  customers: Customer[];
}