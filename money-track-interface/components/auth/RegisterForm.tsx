'use client';

import { Box, Flex, Input, Link, Separator, Text } from '@chakra-ui/react';
import { Field } from '../ui/field';
import { PasswordInput } from '../ui/password-input';
import { Button } from '../ui/button';
import React from 'react';
import { useAuthentication } from '../../hook/useAuthentication';

const RegisterForm = () => {
  const { authentication, setAuthentication } = useAuthentication();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthentication({
      ...authentication,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e);
    console.log(authentication);
  };

  return (
    <Flex justify={'center'} alignItems={'center'} minWidth={'100%'} minHeight="100vh">
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

        <Field label={'Username'}>
          <Input name={'username'} placeholder={'Enter your username'} p={1} onChange={onChange} />
        </Field>
        <Field label={'Image'}>
          <Input name={'image'} placeholder={'Enter your image'} p={1} onChange={onChange} />
        </Field>
        <Field label={'Qr code'}>
          <Input name={'qr'} placeholder={'Enter your Qr'} p={1} onChange={onChange} />
        </Field>
        <Field label={'Balance'}>
          <Input
            name={'balance'}
            type={'number'}
            placeholder={'Enter your balance'}
            p={1}
            onChange={onChange}
          />
        </Field>
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
