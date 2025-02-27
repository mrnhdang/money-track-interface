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
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { UiStateType } from '../../hook/useUiState';
import api from '../../hook/api';

interface EditMemberDialogProps {
  authentication?: Authentication;
  setAuthentication: (authentication: Authentication) => void;
  setUiState: Dispatch<SetStateAction<UiStateType>>;
  fetchMemberInformation: () => void;
}

const EditMemberDialog = ({
  authentication,
  setAuthentication,
  setUiState,
  fetchMemberInformation,
}: EditMemberDialogProps) => {
  const [editMember, setEditMember] = useState({ id: sessionStorage.getItem('id') });
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditMember({
        ...editMember,
        [e.target.name]: e.target.value,
      });
    },
    [editMember],
  );

  const onSubmit = async () => {
    setUiState({ loading: true });
    let error;
    try {
      await api.patch('/auth/profile/edit', editMember);
      fetchMemberInformation();
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      error = e?.response?.data?.message;
      console.log(e);
    } finally {
      setUiState({ loading: false, error });
    }
  };

  console.log(authentication);

  const editProfileForm = useCallback(() => {
    return (
      <Box style={{ gap: 2 }}>
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
            disabled
          />
        </Field>
      </Box>
    );
  }, [authentication, onChange]);

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
        <Button onClick={() => onSubmit()}>Save</Button>
      </DialogFooter>
      <DialogCloseTrigger />
    </DialogContent>
  );
};

export default EditMemberDialog;
