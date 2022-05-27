import { Box, Flex } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
import { useCart } from '../../contexts/CartContext'
import hungry from '../../assets/hungry.jpg'
import { useAuth } from '../../contexts/AuthContext'

export const Dashboard = () => {
  const { loadCatalog, catalog, search, filtered } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    loadCatalog()
  }, [])

  return (
    <Box
      h="100vh"
      bgColor="white"
      bgImage={hungry}
      bgSize="30%"
      bgRepeat={['repeat-x', 'no-repeat']}
      bgPos="100% 100%"
    >
      <Header />

      <Box width="100vw" minH="70vh">
        <Flex
          overflowX={['scroll', 'scroll', 'unset', 'unset']}
          wrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
        >
          {search !== ''
            ? filtered.map(product => (
                <Card
                  key={product.name}
                  Product={{ ...product, userId: user.id }}
                />
              ))
            : catalog.map(product => {
                return (
                  <Card
                    key={product.name}
                    Product={{ ...product, userId: user.id }}
                  />
                )
              })}
        </Flex>
      </Box>
    </Box>
  )
}
