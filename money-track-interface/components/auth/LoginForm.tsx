'use client';

import { Box, Flex, Input, Link, Separator, Text } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { PasswordInput } from '../ui/password-input';
import { Button } from '../ui/button';
import React from 'react';
import { useAuthentication } from '../../hook/useAuthentication';
import axios from 'axios';
import useUiState from '../../hook/useUiState';
import { Alert } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const API_ROUTE = process.env.LOCALHOST;

const LoginForm = () => {
  const { uiState, setUiState } = useUiState();
  const { authentication, setAuthentication, setToken } = useAuthentication();
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
      response = await axios.post(API_ROUTE + '/auth/login', authentication);
      const { token } = response?.data;
      setToken(token);
      setAuthentication(response?.data?.authentication);
      router.push('/');
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      error = e?.response?.data?.message;
    } finally {
      setUiState({ loading: false, error });
    }
  };
  console.log(authentication);

  return (
    <Flex
      justify={'center'}
      alignItems={'center'}
      minWidth={'100%'}
      minHeight="100vh"
      p={{ base: 3 }}
    >
      <Box
        as="form"
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
        <div
          style={{
            justifyItems: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Text fontWeight={'bold'} color={'teal'} textStyle={'4xl'}>
            LOGIN
          </Text>
          <Text textStyle={'2xl'}>Welcome to huda&#39;s money track</Text>
        </div>

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

        <Field label={'Email'}>
          <Input name={'email'} placeholder={'Enter your email'} p={1} onChange={onChange} />
        </Field>

        <Field label={'Password'}>
          <PasswordInput
            name={'password'}
            placeholder={'Enter your password'}
            p={1}
            onChange={onChange}
          />
        </Field>

        <div style={{ width: '100%' }}>
          <Button type={'submit'} colorPalette={'teal'} width={'100%'}>
            Login
          </Button>
          <Separator marginY={'2'} />
          <Link
            variant="plain"
            href="/register"
            colorPalette="teal"
            justifyContent={'center'}
            width="100%"
          >
            If you haven&#39;t had account yet, let move to Register Page
          </Link>
        </div>
      </Box>
    </Flex>
  );
};

export default LoginForm;
