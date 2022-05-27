import { Center, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useCart } from '../../contexts/CartContext'
import { Input } from './input'

export const SearchBox = () => {
  const { search, handleSearch } = useCart()
  const [value, setValue] = useState('')

  return (
    <Flex
      backgroundColor="white"
      border="2px"
      borderColor="gray.100"
      borderStyle="solid"
      w="100%"
      paddingX="3"
      paddingY="1"
      _focusWithin={{ borderColor: 'gray.300' }}
    >
      <Flex>
        <Input
          _focus={{ focus: 'none' }}
          h="32px"
          name="Search"
          border="none"
          background="none"
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
        />
        <Center
          as="button"
          ml="1"
          w="40px"
          fontSize="m"
          h="32px"
          borderRadius="5px"
          bgColor="primary.100"
          _hover={{ background: 'primary.200' }}
          onClick={() => handleSearch(value)}
        >
          <FaSearch color="white" />
        </Center>
      </Flex>
    </Flex>
  )
}
