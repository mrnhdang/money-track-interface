'use client';
import { Flex, IconButton } from '@chakra-ui/react';
import { Button } from '../ui/button';
import { FaDollarSign } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();
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
      style={{ zIndex: 1000 }}
    >
      <IconButton
        size={'xl'}
        p={1}
        colorPalette="teal"
        aria-label="Call support"
        rounded="full"
        onClick={() => router.push('/')}
      >
        <FaDollarSign />
      </IconButton>
      <Flex gap={1} justify={'flex-end'} width={'100%'}>
        <Button colorPalette="teal" variant="solid" onClick={() => router?.push('/login')}>
          LOGIN
        </Button>
        <Button colorPalette="teal" variant="outline" onClick={() => router?.push('/register')}>
          REGISTER
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
