'use client';

import { Stack } from '@chakra-ui/react';

import React, { useCallback, useEffect, useState } from 'react';
import MemberInfo from '../components/member/MemberInfo';
import Transaction from '../components/transaction/Transaction';
import { useAuthentication } from '../hook/useAuthentication';
import Header from '../components/fragment/Header';
import useUiState from '../hook/useUiState';
import api from '../hook/api';

export type TransactionType = {
  id?: number;
  description?: string;
  transactionDatetime?: string;
  amount: number;
};

export default function Home() {
  const { uiState, setUiState } = useUiState();
  const { authentication, setAuthentication } = useAuthentication();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const fetchMemberInformation = useCallback(async () => {
    setUiState({ loading: true });
    let response, error;
    try {
      response = await api.get('/auth/profile/' + sessionStorage.getItem('id'));
      console.log(response?.data);
      setAuthentication(response?.data);
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      error = e?.response?.data?.message;
      console.log(e);
    } finally {
      setUiState({ loading: false, error });
    }
  }, [setAuthentication, setUiState]);

  useEffect(() => {
    fetchMemberInformation();
  }, [fetchMemberInformation]);

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
          <MemberInfo
            authentication={authentication}
            setAuthentication={setAuthentication}
            uiState={uiState}
            setUiState={setUiState}
            fetchMemberInformation={fetchMemberInformation}
          />
          <Transaction transactions={transactions} setTransactions={setTransactions} />
        </Stack>
      </div>
    </>
  );
}
