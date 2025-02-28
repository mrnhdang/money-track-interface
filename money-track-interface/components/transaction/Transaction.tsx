'use client';
import {
  EmptyState,
  Flex,
  Heading,
  HStack,
  IconButton,
  Separator,
  Stack,
  Table,
  VStack,
} from '@chakra-ui/react';
import { AddIcon, Alert, CheckIcon, DeleteIcon, Editable, RepeatIcon } from '@chakra-ui/icons';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '../ui/pagination';
import useUiState from '../../hook/useUiState';
import { TransactionType } from '../../app/page';
import { GrTransaction } from 'react-icons/gr';
import api from '../../hook/api';

interface TransactionProps {
  transactions: TransactionType[];
  setTransactions: Dispatch<SetStateAction<TransactionType[]>>;
  fetchMemberTransaction: (page?: number, pageSize?: number) => void;
  fetchMemberInformation: () => void;
}

const Transaction = ({
  transactions,
  setTransactions,
  fetchMemberTransaction,
  fetchMemberInformation,
}: TransactionProps) => {
  const { uiState, setUiState } = useUiState();
  const [tempTransactions, setTempTransactions] = useState<TransactionType>({
    id: 0,
    description: undefined,
    transactionDatetime: undefined,
    amount: 0.0,
    memberId: sessionStorage.getItem('id'),
  });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageLength, setPageLength] = useState(1);
  const [isEditId, setIsEditId] = useState<number | undefined>(undefined);
  const [isNewTransaction, setIsNewTransaction] = useState<boolean>(false);

  //TODO: Create drop down input for page size selection.

  const onPageChange = (page: number) => {
    setPage(page);
    fetchMemberTransaction(page - 1, pageSize);
  };

  const onChangeTempTransactions = useCallback(
    (id: number, field: string, value: string) => {
      if (isEditId && id !== isEditId) {
        setUiState({
          loading: false,
          error:
            'Transaction ' +
            isEditId +
            ' is edited. Please save your change before editing another transaction. Thank you.',
        });
      } else {
        setTempTransactions({ ...tempTransactions, [field]: value, id: id });
        setIsEditId(id);
      }
    },
    [isEditId, setUiState, tempTransactions],
  );

  const addNewRowTransaction = () => {
    setTransactions((prev) => [
      {
        id: 0, // Ensuring unique ID
        description: 'Enter Description',
        transactionDatetime: new Date().toISOString(),
        amount: 0.0,
      },
      ...prev, // Creating a new array instead of mutating prev directly
    ]);
    setTempTransactions({
      ...tempTransactions,
      id: 0, // Ensuring unique ID
      description: 'Enter Description',
      transactionDatetime: new Date().toISOString(),
      amount: 0.0,
    });
    setIsNewTransaction(true);
  };

  const onSave = useCallback(
    async (id: number) => {
      setIsNewTransaction(false);
      setIsEditId(undefined);

      let error;
      let response;
      try {
        if (id && id !== 0) {
          response = await api.patch('/api/transaction/' + id, tempTransactions);
        } else {
          response = await api.post('/api/transaction', tempTransactions);
        }
        console.log(response?.data);
        fetchMemberTransaction();
        fetchMemberInformation();
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error = e?.response?.data?.message;
        console.log(e);
      } finally {
        setUiState({ loading: false, error });
      }
    },
    [fetchMemberInformation, fetchMemberTransaction, setUiState, tempTransactions],
  );

  const removeTransaction = useCallback(
    async (id?: number) => {
      setTransactions((prev) => prev?.filter((transaction) => transaction.id !== id));
      let error;
      try {
        if (id && id !== 0) {
          await api.delete('/api/transaction/' + id);
        }
        fetchMemberTransaction();
        fetchMemberInformation();
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error = e?.response?.data?.message;
        console.log(e);
      } finally {
        setUiState({ loading: false, error });
      }
    },
    [fetchMemberInformation, fetchMemberTransaction, setTransactions, setUiState],
  );

  const renderTransactionsTable = useCallback(() => {
    if (transactions?.length > 0) {
      return (
        <Table.Body>
          {transactions?.map((item) => {
            const isNewTransactionCreated = isNewTransaction && item?.id == 0;
            return (
              <Table.Row key={item?.id}>
                <Table.Cell>{item?.id}</Table.Cell>
                <Table.Cell>
                  <Editable.Root
                    name={'description'}
                    width={'fit-content'}
                    textAlign={'start'}
                    defaultValue={item?.description ? item?.description : ''}
                  >
                    <Editable.Preview />
                    <Editable.Input
                      onChange={(e) => {
                        onChangeTempTransactions(item?.id, 'description', e.target.value);
                      }}
                    />
                  </Editable.Root>
                </Table.Cell>
                <Table.Cell>
                  <Editable.Root
                    name={'transactionDatetime'}
                    width={'fit-content'}
                    textAlign={'start'}
                    defaultValue={item?.transactionDatetime ? item?.transactionDatetime : ''}
                  >
                    <Editable.Preview />
                    <Editable.Input
                      type={'datetime-local'}
                      onChange={(e) => {
                        onChangeTempTransactions(item?.id, 'transactionDatetime', e.target.value);
                      }}
                    />
                  </Editable.Root>
                </Table.Cell>
                <Table.Cell>
                  <Editable.Root
                    name={'amount'}
                    width={'fit-content'}
                    textAlign={'start'}
                    defaultValue={item?.amount ? item?.amount?.toString() : '0'}
                    color={item?.amount > 0 ? 'teal' : 'red'}
                  >
                    <Editable.Preview />
                    <Editable.Input
                      onChange={(e) => {
                        onChangeTempTransactions(item?.id, 'amount', e.target.value);
                      }}
                    />
                  </Editable.Root>
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <Flex gap={1} justify={'flex-end'}>
                    {isNewTransactionCreated || isEditId === item?.id ? (
                      <IconButton
                        onClick={() => onSave(item?.id)}
                        variant={'solid'}
                        colorPalette={'teal'}
                      >
                        <CheckIcon />
                      </IconButton>
                    ) : (
                      <div style={{ width: '64px' }}></div>
                    )}
                    <IconButton
                      onClick={() => removeTransaction(item?.id)}
                      variant={'outline'}
                      colorPalette={'red'}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      );
    }
  }, [
    isEditId,
    isNewTransaction,
    onChangeTempTransactions,
    onSave,
    removeTransaction,
    transactions,
  ]);

  useEffect(() => {
    const countPageLength = async () => {
      let error;
      try {
        const response = await api.get(
          '/api/transaction/countTotalPage/' + sessionStorage.getItem('id'),
        );
        setPageLength(response?.data);
      } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        error = e?.response?.data?.message;
        console.log(e);
      } finally {
        setUiState({ loading: false, error });
      }
    };
    countPageLength();
  }, [setUiState]);

  return (
    <Stack
      width={{ base: 'fit-content', sm: 'fit-content', md: 'fit-content', lg: 'full' }}
      gap="5"
    >
      {/*Title*/}
      <Flex alignItems={'center'}>
        <Heading size="2xl" width={'fit-content'}>
          Transaction
        </Heading>
        <Flex width={'full'} gap={1} justify={'flex-end'}>
          <IconButton
            rounded={'full'}
            width={'fit-content'}
            size={'xl'}
            colorPalette={'teal'}
            variant={'outline'}
            onClick={() => {
              fetchMemberTransaction();
            }}
          >
            <RepeatIcon w={6} h={6} />
          </IconButton>
          <IconButton
            rounded={'full'}
            width={'fit-content'}
            size={'xl'}
            colorPalette={'teal'}
            disabled={isNewTransaction || !!uiState?.error}
            onClick={addNewRowTransaction}
          >
            <AddIcon w={6} h={6} />
          </IconButton>
        </Flex>
      </Flex>

      {/*Alert*/}
      {uiState?.error && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{uiState?.error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      <Separator marginBottom={'2'} />

      {/*Content*/}
      <Table.Root size="lg" interactive>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Transaction Date</Table.ColumnHeader>
            <Table.ColumnHeader>Amount</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        {renderTransactionsTable()}
      </Table.Root>

      {!transactions ||
        (transactions?.length === 0 && (
          <EmptyState.Root size={'lg'}>
            <EmptyState.Content>
              <EmptyState.Indicator>
                <GrTransaction />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>Your transaction is empty</EmptyState.Title>
                <EmptyState.Description>
                  Create and manage your transactions.
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
        ))}

      <PaginationRoot
        count={pageLength ? pageLength : 0}
        pageSize={5}
        page={page}
        onPageChange={(e) => onPageChange(e.page)}
      >
        <HStack wrap="wrap">
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </HStack>
      </PaginationRoot>
    </Stack>
  );
};

export default Transaction;
