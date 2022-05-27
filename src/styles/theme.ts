import { extendTheme, theme as ChakraTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    primary: {
      100: '#27AE60',
      200: '#93D7AF'
    },

    secondary: {
      100: '#EB5757'
    },
    gray: {
      0: '#F5F5F5',
      100: '#E0E0E0',
      300: '#828282',
      600: '#333333'
    },
    feed: {
      100: '#155BCB',
      201: '#168821',
      300: '#FFCD07',
      404: '#E60000'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    fontSizes: {
      xs: '0.75rem',
      s: '0.875rem',
      m: '1rem',
      lg: '1.125rem',
      xg: '1.25rem',
      xxg: '1.385rem',
      exg: '1.625rem'
    },
    styles: {
      global: {
        body: {
          bg: 'FFF',
          color: 'gray.600'
        }
      }
    }
  }
})
