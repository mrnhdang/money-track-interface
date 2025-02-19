import { Box, Button, Input } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Authentication } from '../../hook/useAuthentication';
import { Field } from '../ui/field';
import { PasswordInput } from '../ui/password-input';
import React from 'react';

interface EditMemberDialogProps {
  authentication?: Authentication;
  setAuthentication: (authentication: Authentication) => void;
}

const EditMemberDialog = ({ authentication, setAuthentication }: EditMemberDialogProps) => {
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

  const editProfileForm = () => {
    return (
      <Box as={'form'} onSubmit={onSubmit} style={{ gap: 2 }}>
        <Field label={'Username'}>
          <Input
            name={'username'}
            placeholder={'Enter your username'}
            p={1}
            defaultValue={authentication?.username}
            onChange={onChange}
          />
        </Field>
        <Field label={'Image'}>
          <Input
            name={'image'}
            placeholder={'Enter your image'}
            p={1}
            defaultValue={authentication?.image}
            onChange={onChange}
          />
        </Field>
        <Field label={'Qr code'}>
          <Input
            name={'qr'}
            placeholder={'Enter your Qr'}
            p={1}
            defaultValue={authentication?.qr}
            onChange={onChange}
          />
        </Field>
        <Field label={'Balance'}>
          <Input
            name={'balance'}
            type={'number'}
            placeholder={'Enter your balance'}
            p={1}
            defaultValue={authentication?.balance}
            onChange={onChange}
          />
        </Field>
        <Field label={'Email'}>
          <Input
            name={'email'}
            placeholder={'Enter your email'}
            p={1}
            defaultValue={authentication?.email}
            onChange={onChange}
          />
        </Field>
        <Field label={'Password'}>
          <PasswordInput
            name={'password'}
            placeholder={'Enter your password'}
            p={1}
            defaultValue={authentication?.password}
            onChange={onChange}
          />
        </Field>
      </Box>
    );
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
      </DialogHeader>
      <DialogBody>{editProfileForm()}</DialogBody>
      <DialogFooter>
        <DialogActionTrigger asChild>
          <Button variant="outline">Cancel</Button>
        </DialogActionTrigger>
        <Button>Save</Button>
      </DialogFooter>
      <DialogCloseTrigger />
    </DialogContent>
  );
};

export default EditMemberDialog;
