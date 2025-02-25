'use client';

import { Stack } from '@chakra-ui/react';

import { useState } from 'react';
import MemberInfo from '../components/member/MemberInfo';
import Transaction from '../components/transaction/Transaction';
import { useAuthentication } from '../hook/useAuthentication';
import { MOCK_TRANSACTIONS } from '../mock';
import Header from '../components/fragment/Header';

export type TransactionType = {
  id?: number;
  description?: string;
  transactionDatetime?: string;
  amount: number;
};
export default function Home() {
  const { authentication, setAuthentication } = useAuthentication();
  const [transactions, setTransactions] = useState<TransactionType[]>(MOCK_TRANSACTIONS);
  return (
    <>
      <Header />
      <div
        style={{
          paddingTop: '56px',
        }}
      >
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
          <MemberInfo authentication={authentication} setAuthentication={setAuthentication} />
          <Transaction transactions={transactions} setTransactions={setTransactions} />
        </Stack>
      </div>
    </>
  );
}
