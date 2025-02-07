import { Flex, IconButton } from '@chakra-ui/react';
import { Button } from '../ui/button';
import { FaDollarSign } from 'react-icons/fa6';

const Header = () => {
  return (
    <Flex
      as="header"
      position={'fixed'}
      filter={'auto'}
      backdropFilter={'blur(10px)'}
      direction={'row'}
      p={1}
      paddingX={2}
      alignItems="center"
      width="100%"
      z-index={1500}
    >
      <IconButton size={'xl'} p={1} colorPalette="teal" aria-label="Call support" rounded="full">
        <FaDollarSign />
      </IconButton>
      <Flex gap={1} justify={'flex-end'} width={'100%'}>
        <Button colorPalette="teal" variant="solid">
          LOGIN
        </Button>
        <Button colorPalette="teal" variant="outline">
          REGISTER
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
