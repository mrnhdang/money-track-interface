import { TransactionType } from './app/page';

export const MOCK_TRANSACTIONS: TransactionType[] = [
  { id: 1, description: 'Rent', transactionDatetime: '2024-01-01T00:00:00Z', amount: 1200.0 },
  { id: 2, description: 'Groceries', transactionDatetime: '2024-01-05T14:30:00Z', amount: -250.75 },
  {
    id: 3,
    description: 'Electricity Bill',
    transactionDatetime: '2024-01-10T08:00:00Z',
    amount: 90.5,
  },
  {
    id: 4,
    description: 'Internet Bill',
    transactionDatetime: '2024-01-12T09:15:00Z',
    amount: 60.0,
  },
  { id: 5, description: 'Dining Out', transactionDatetime: '2024-01-15T19:45:00Z', amount: -45.3 },
  { id: 6, description: 'Gas', transactionDatetime: '2024-01-18T13:20:00Z', amount: -80.0 },
  {
    id: 7,
    description: 'Streaming Services',
    transactionDatetime: '2024-01-20T00:00:00Z',
    amount: 15.99,
  },
  {
    id: 8,
    description: 'Gym Membership',
    transactionDatetime: '2024-01-22T07:00:00Z',
    amount: 40.0,
  },
  {
    id: 9,
    description: 'Car Maintenance',
    transactionDatetime: '2024-01-25T10:45:00Z',
    amount: 200.0,
  },
  {
    id: 10,
    description: 'Entertainment',
    transactionDatetime: '2024-01-28T21:00:00Z',
    amount: 75.0,
  },
];
