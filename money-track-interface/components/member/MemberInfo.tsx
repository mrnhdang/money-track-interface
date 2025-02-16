import { Box, Card, Flex, Heading, Image, Separator, Stack, Text } from '@chakra-ui/react';
import { Button } from '../ui/button';
import { DataListItem, DataListRoot } from '../ui/data-list';

const MemberInfo = () => {
  return (
    <Stack width={'full'} gap={'5'}>
      <Heading size="2xl">Profile</Heading>
      <Separator width={'full'} marginBottom={'2'} />
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
                <DataListItem label={'Username'} value={'Nguyen Huu Dang'} />
                <DataListItem label={'Email'} value={'huudang23102001@gmail.com'} />
              </DataListRoot>
            </Card.Body>
            <Card.Footer>
              <Button>Update information</Button>
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
                <Text fontWeight={'bold'} color={'teal'} textStyle={'4xl'}>
                  1.000.000
                </Text>
              </DataListRoot>
            </Card.Body>
          </Box>
        </Card.Root>{' '}
      </Flex>
    </Stack>
  );
};
export default MemberInfo;
