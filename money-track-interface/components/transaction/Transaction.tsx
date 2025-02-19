import { Flex, Heading, HStack, IconButton, Separator, Stack, Table } from '@chakra-ui/react';
import { Button } from '../ui/button';
import { AddIcon, Alert, CheckIcon, DeleteIcon, Editable, RepeatIcon } from '@chakra-ui/icons';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { ValueChangeDetails } from '@zag-js/editable';
import { TransactionType } from '../../app/track/page';
import { MOCK_TRANSACTIONS } from '../../mock';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '../ui/pagination';
import useUiState from '../../hook/useUiState';

interface TransactionProps {
  transactions: TransactionType[];
  setTransactions: Dispatch<SetStateAction<TransactionType[]>>;
}

const Transaction = ({ transactions, setTransactions }: TransactionProps) => {
  const { uiState, setUiState } = useUiState();
  const [tempTransactions, setTempTransactions] = useState({
    id: 0,
    description: undefined,
    transactionDatetime: undefined,
    amount: 0.0,
  });
  const [isEditId, setIsEditId] = useState<number | undefined>(undefined);
  const [isNewTransaction, setIsNewTransaction] = useState<boolean>(false);

  const onChangeTempTransactions = useCallback(
    (id: number, field: string, value: ValueChangeDetails) => {
      if (isEditId && id !== isEditId) {
        setUiState({
          loading: false,
          error:
            'Transaction ' +
            isEditId +
            ' is edited. Please save your change before editing another transaction. Thank you.',
        });
      } else {
        setTempTransactions({ ...tempTransactions, [field]: value?.value, id: id });
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
    setIsNewTransaction(true);
  };

  const onSave = () => {
    //TODO: Call API
    setIsNewTransaction(false);
    setIsEditId(undefined);
    setTransactions(MOCK_TRANSACTIONS);
    setTempTransactions({
      id: 0,
      description: undefined,
      transactionDatetime: undefined,
      amount: 0.0,
    });
    setUiState({ loading: false });
  };

  const removeTransaction = (id?: number) => {
    setTransactions((prev) => prev?.filter((transaction) => transaction.id !== id));
    // TODO: Call API
  };

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
                    defaultValue={item?.description}
                    onValueChange={(e: ValueChangeDetails) => {
                      if (item?.id) onChangeTempTransactions(item?.id, 'description', e);
                    }}
                  >
                    <Editable.Preview />
                    <Editable.Input />
                  </Editable.Root>
                </Table.Cell>
                <Table.Cell>
                  <Editable.Root
                    name={'transactionDatetime'}
                    width={'fit-content'}
                    textAlign={'start'}
                    defaultValue={item?.transactionDatetime}
                    onValueChange={(e: ValueChangeDetails) => {
                      if (item?.id) onChangeTempTransactions(item?.id, 'transactionDatetime', e);
                    }}
                  >
                    <Editable.Preview />
                    <Editable.Input />
                  </Editable.Root>
                </Table.Cell>
                <Table.Cell>
                  <Editable.Root
                    name={'amount'}
                    width={'fit-content'}
                    textAlign={'start'}
                    defaultValue={item?.amount?.toString()}
                    color={item?.amount > 0 ? 'teal' : 'red'}
                    onValueChange={(e: ValueChangeDetails) => {
                      if (item?.id) onChangeTempTransactions(item?.id, 'amount', e);
                    }}
                  >
                    <Editable.Preview />
                    <Editable.Input />
                  </Editable.Root>
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <Flex gap={1} justify={'flex-end'}>
                    {isNewTransactionCreated || isEditId === item?.id ? (
                      <IconButton onClick={onSave} variant={'solid'} colorPalette={'teal'}>
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

  return (
    <Stack width={{ md: '100vh', lg: 'full' }} gap="5">
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
            onClick={() => {}}
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

      <PaginationRoot count={transactions ? transactions?.length * 5 : 0} pageSize={5} page={1}>
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
