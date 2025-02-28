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
  id: number;
  description?: string;
  transactionDatetime?: string;
  amount: number;
  memberId?: number | string | null;
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

  const fetchMemberTransaction = useCallback(
    async (page?: number, pageSize?: number) => {
      setUiState({ loading: true });
      let response, error;
      try {
        if (page || pageSize) {
          response = await api.get(
            '/api/transaction?memberId=' +
              sessionStorage.getItem('id') +
              '&pageNumber=' +
              page +
              '&pageSize=' +
              pageSize,
          );
        } else {
          response = await api.get('/api/transaction?memberId=' + sessionStorage.getItem('id'));
        }
        setTransactions(response?.data);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error = e?.response?.data?.message;
        console.log(e);
      } finally {
        setUiState({ loading: false, error });
      }
    },
    [setUiState],
  );

  useEffect(() => {
    fetchMemberInformation();
  }, [fetchMemberInformation]);

  useEffect(() => {
    fetchMemberTransaction();
  }, [fetchMemberTransaction]);
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
          <Transaction
            transactions={transactions}
            setTransactions={setTransactions}
            fetchMemberTransaction={fetchMemberTransaction}
            fetchMemberInformation={fetchMemberInformation}
          />
        </Stack>
      </div>
    </>
  );
}
