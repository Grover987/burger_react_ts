import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'

interface ModalCartProps {
  isOpen: boolean
  onClose: () => void
  mess: string
}

interface Product {
  productId: number
  name: string
  category: string
  imgUrl: string
  price: number
  userId: number
  id?: number
  quantity?: number
}

export const ModalCart = ({ isOpen, onClose }: ModalCartProps) => {
  const {
    cart,
    loadCart,
    removeCart,
    getTotal,
    total,
    changeQuantPlus,
    changeQuantMinus
  } = useCart()
  const { user, accessToken } = useAuth()

  const handleDelete = (product: any) => {
    removeCart(product, accessToken)
    loadCart(user, accessToken)
    getTotal()
  }

  const handleAddCart = (prod: any) => {
    const att = cart.find(e => e.productId === prod.productId)
    changeQuantPlus(att, accessToken)
  }

  const handleRemoveCart = (prod: any) => {
    prod.quantity === 1
      ? handleDelete(prod)
      : changeQuantMinus(prod, accessToken)
  }

  const finishCart = () => {
    cart.forEach(item => removeCart(item, accessToken))
    onClose()
  }

  useEffect(() => {
    loadCart(user, accessToken)
  }, [])

  useEffect(() => {
    getTotal()
  }, [cart])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white" bgColor="feed.201">
          Your Cart
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Center flexDir="column">
            <Box
              alignItems="center"
              alignContent="center"
              w="100%"
              fontWeight="bold"
              fontSize="lg"
            >
              {cart.map((product: Product) => (
                <Flex
                  mt="2"
                  width="100%"
                  dir="column"
                  justifyContent="space-between"
                  key={product.name}
                >
                  <Image w="32px" src={product.imgUrl} />
                  <Text>{product.name}</Text>
                  <Text>${product.price}</Text>
                  <Text>{product.quantity}</Text>
                  <Button onClick={() => handleAddCart(product)}>+</Button>
                  <Button
                    colorScheme="gray"
                    onClick={() => handleDelete(product)}
                  >
                    <FaTrash />
                  </Button>
                  <Button onClick={() => handleRemoveCart(product)}>-</Button>
                </Flex>
              ))}
            </Box>
            <Text>Total: {total.toFixed(2)} </Text>
          </Center>
          <Box></Box>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button width="90%" colorScheme="red" onClick={finishCart}>
            Finish Order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
