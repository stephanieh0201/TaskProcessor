import { CustomerList } from '../../src/components/customer/Customer';

export const mockCustomers: CustomerList = {
  customers: [{
    _id: '1',
    taskMinSeconds: 0,
    taskMaxSeconds: 4,
  }, {
    _id: '2',
    taskMinSeconds: 3,
    taskMaxSeconds: 5,
  }, {
    _id: '3',
    taskMinSeconds: 10,
    taskMaxSeconds: 16,
  }],
};
