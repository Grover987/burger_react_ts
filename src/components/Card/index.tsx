import { Box, Button, Image, Text, VStack } from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'

interface ProductData {
  category: string
  imgUrl: string
  name: string
  price: number
  productId: number
  userId: number
}

export const Card = ({ Product }: any) => {
  const { addCart, cart, changeQuantPlus } = useCart()
  const { user, accessToken } = useAuth()

  const handleAddCart = (prod: any) => {
    if (cart.map(e => e.name).includes(prod.name)) {
      const att = cart.find(e => e.productId === prod.productId)
      changeQuantPlus(att, accessToken)
    } else {
      addCart({ ...Product, quantity: 1 }, accessToken)
    }
  }

  return (
    <Box
      alignItems="center"
      margin={['2', '3']}
      minW="230px"
      maxW="230px"
      h="310px"
      border="2px"
      bgColor="white"
      borderColor="gray.100"
      borderStyle="solid"
      _hover={{ borderColor: 'primary.100' }}
      boxShadow="lg"
    >
      <Image margin="0" h="150px" w="100%" src={Product.imgUrl} />
      <VStack textAlign="center" mt="3" spacing="14px">
        <Text fontSize="18px" color="gray.600" fontWeight="bold" as="h3">
          {Product.name}
        </Text>
        <Text color="#27AE60" fontSize="14px">
          $ {Intl.NumberFormat('us-EN').format(Product.price)}
        </Text>
        <Button
          color="white"
          background="#BDBDBD"
          _hover={{ background: 'primary.100' }}
          w="106px"
          h="40px"
          onClick={() => handleAddCart(Product)}
        >
          Add
        </Button>
      </VStack>
    </Box>
  )
}
