'use client';
import MemberInfo from '../../components/member/MemberInfo';
import { Stack } from '@chakra-ui/react';
import Transaction from '../../components/transaction/Transaction';
import { useState } from 'react';
import { MOCK_TRANSACTIONS } from '../../mock';

export type TransactionType = {
  id?: number;
  description?: string;
  transactionDatetime?: string;
  amount?: number;
};

const TrackPage = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>(MOCK_TRANSACTIONS);
  return (
    <Stack
      as={'div'}
      paddingX={{ md: '0', lg: '20' }}
      gap={10}
      display={'flex'}
      flexDirection={'column'}
      justifyItems={'center'}
      minHeight={'100vh'}
      width={'100%'}
      p={1}
    >
      <MemberInfo />
      <Transaction transactions={transactions} setTransactions={setTransactions} />
    </Stack>
  );
};

export default TrackPage;
