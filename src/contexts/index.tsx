import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { theme } from '../styles/theme'
import { AuthProvider } from './AuthContext'
import { CartProvider } from './CartContext'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      <CartProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CartProvider>
    </AuthProvider>
  )
}
