import { Grid, Image, Text } from '@chakra-ui/react'
import logo from '../../assets/saberBorgarLogo.png'

export const SignUpInfo = () => {
  return (
    <Grid w={['100%', '100%', '50%', '50%']}>
      <Image w="80%" margin="0 auto" src={logo} alt="Logo" />
      <Text
        color="white"
        fontWeight="extrabold"
        mt="2"
        fontSize={['10', '10', '20', '20']}
        as="h1"
      >
        Life is like a sandwich and you have to fill it with the best
        ingredients.
      </Text>
    </Grid>
  )
}
