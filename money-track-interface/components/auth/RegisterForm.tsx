'use client';

import { Box, Flex, Link, Separator, Text } from '@chakra-ui/react';
import { Field, Input } from '@chakra-ui/react';
import { PasswordInput } from '../ui/password-input';
import { Button } from '../ui/button';
import React from 'react';
import { useAuthentication } from '../../hook/useAuthentication';
import axios from 'axios';
import useUiState from '../../hook/useUiState';
import { Alert } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const API_ROUTE = process.env.LOCALHOST;

const RegisterForm = () => {
  const { uiState, setUiState } = useUiState();
  const { authentication, setAuthentication } = useAuthentication();
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthentication({
      ...authentication,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUiState({ loading: true });
    let response, error;
    try {
      setAuthentication({
        ...authentication,
        role: 'MEMBER',
      });
      console.log(authentication);
      response = await axios.post(API_ROUTE + '/auth/register', authentication);
      console.log(response?.data);
      router.push('/login');
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      error = e?.response?.data?.message;
    } finally {
      setUiState({ loading: false, error });
    }
  };

  return (
    <Flex
      justify={'center'}
      alignItems={'center'}
      minWidth={'100%'}
      minHeight="100vh"
      p={{ base: 3 }}
    >
      <Box
        as={'form'}
        justifyItems={'center'}
        height={'100%'}
        width={'500px'}
        minWidth={'25%'}
        spaceY={'10'}
        rounded={'lg'}
        border={'2px solid teal'}
        p={4}
        m={1}
        onSubmit={onSubmit}
      >
        <Text fontWeight={'bold'} color={'teal'} textStyle={'4xl'}>
          Register
        </Text>

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

        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input name={'username'} placeholder={'Enter your username'} p={1} onChange={onChange} />
          <Field.ErrorText>This is an error text</Field.ErrorText>
        </Field.Root>
        <Field.Root>
          <Field.Label>Image</Field.Label>
          <Input name={'image'} placeholder={'Enter your image'} p={1} onChange={onChange} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Qr code</Field.Label>
          <Input name={'qr'} placeholder={'Enter your Qr'} p={1} onChange={onChange} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Balance</Field.Label>
          <Input
            name={'balance'}
            type={'number'}
            placeholder={'Enter your balance'}
            p={1}
            onChange={onChange}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input name={'email'} placeholder={'Enter your email'} p={1} onChange={onChange} />
        </Field.Root>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <PasswordInput
            name={'password'}
            placeholder={'Enter your password'}
            p={1}
            onChange={onChange}
          />
        </Field.Root>

        <div style={{ width: '100%' }}>
          <Button type={'submit'} colorPalette={'teal'} width={'100%'}>
            Register
          </Button>
          <Separator marginY={'2'} />
          <Link
            variant="plain"
            href="/login"
            colorPalette="teal"
            justifyContent={'center'}
            width="100%"
          >
            If you already have account, let move to Login Page
          </Link>
        </div>
      </Box>
    </Flex>
  );
};

export default RegisterForm;
