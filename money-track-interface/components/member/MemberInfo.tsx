import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  Separator,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { DataListItem, DataListRoot } from '../ui/data-list';
import EditMemberDialog from './EditMemberDialog';
import { Authentication } from '../../hook/useAuthentication';
import { DialogRoot, DialogTrigger } from '../ui/dialog';
import React, { Dispatch, SetStateAction } from 'react';
import { UiStateType } from '../../hook/useUiState';
import { Alert } from '@chakra-ui/icons';

interface MemberInfoProps {
  authentication?: Authentication;
  setAuthentication: (authentication: Authentication) => void;
  uiState: UiStateType;
  setUiState: Dispatch<SetStateAction<UiStateType>>;
  fetchMemberInformation: () => void;
}

const MemberInfo = ({
  authentication,
  setAuthentication,
  uiState,
  setUiState,
  fetchMemberInformation,
}: MemberInfoProps) => {
  return (
    <Stack
      width={{ base: 'fit-content', sm: 'fit-content', md: 'fit-content', lg: 'full' }}
      gap={'5'}
    >
      <Heading size="2xl">Profile</Heading>
      <Separator width={'full'} marginBottom={'2'} />

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

      {/*Loading*/}
      {uiState?.loading ? (
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          width={'full'}
          justifyContent={'center'}
          gap={'2rem'}
          p={1}
        >
          <Spinner size={'xl'} colorPalette={'teal'} color={'teal'} />
        </Flex>
      ) : (
        <Flex
          flexDirection={{ base: 'column', lg: 'row' }}
          width={'full'}
          justifyContent={'center'}
          gap={'2rem'}
          p={1}
        >
          <Card.Root
            as={'div'}
            style={{ zIndex: 10 }}
            width={'max-content'}
            flexDirection="row"
            overflow="hidden"
          >
            <Image
              objectFit="cover"
              maxW="200px"
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
              alt="Caffe Latte"
            />
            <Box>
              <Card.Body>
                <DataListRoot orientation="horizontal">
                  <DataListItem label={'Username'} value={authentication?.username} />
                  <DataListItem label={'Email'} value={authentication?.email} />
                </DataListRoot>
              </Card.Body>
              <Card.Footer>
                <HStack gap={10}>
                  <DialogRoot size={'lg'}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size={'lg'}>
                        Update information
                      </Button>
                    </DialogTrigger>
                    <EditMemberDialog
                      authentication={authentication}
                      setAuthentication={setAuthentication}
                      setUiState={setUiState}
                      fetchMemberInformation={fetchMemberInformation}
                    />
                  </DialogRoot>
                </HStack>
              </Card.Footer>
            </Box>
          </Card.Root>
          <Card.Root
            as={'div'}
            style={{ zIndex: 10 }}
            width={'max-content'}
            flexDirection="row"
            overflow="hidden"
          >
            <Box>
              <Card.Body>
                <DataListRoot orientation="horizontal">
                  <Heading size="xl">Balance</Heading>
                  <Text
                    fontWeight={'bold'}
                    color={
                      !!authentication?.balance && authentication?.balance >= 0 ? 'teal' : 'red'
                    }
                    textStyle={'4xl'}
                  >
                    {authentication?.balance}
                  </Text>
                </DataListRoot>
              </Card.Body>
            </Box>
          </Card.Root>{' '}
        </Flex>
      )}
    </Stack>
  );
};
export default MemberInfo;
