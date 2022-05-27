import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import { Input } from '../../components/Form/input'
import alter from '../../assets/alter.jpg'
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister
} from 'react-hook-form'
import { useHistory } from 'react-router-dom'

interface LoginFormProps {
  handleSignIn: () => void
  errors: DeepMap<FieldValues, FieldError>
  register: UseFormRegister<FieldValues>
}

export const LoginForm = ({
  handleSignIn,
  errors,
  register
}: LoginFormProps) => {
  const history = useHistory()
  return (
    <Grid
      onSubmit={handleSignIn}
      as="form"
      margin="4"
      w={['100%', '100%', '50%', '50%']}
      padding="30px 15px"
      border="3px solid black"
      bg="white"
      backgroundImage={alter}
      bgRepeat="no-repeat"
      bgPos="top"
      color="gray.600"
      textAlign="left"
    >
      <Heading size="3">Login</Heading>
      <VStack spacing="5" mt="5">
        <Box w="100%">
          <Input
            type="email"
            label="E-mail"
            error={errors.email}
            {...register('email')}
          />
        </Box>
        <Input
          label="Password"
          type="password"
          error={errors.password}
          {...register('password')}
        />
        <Button
          mt="4"
          bg="primary.100"
          w="100%"
          color="white"
          h="60px"
          borderRadius="10px"
          _hover={{ bg: 'primary.200' }}
          type="submit"
        >
          SignIn
        </Button>

        <Button
          onClick={() => history.push('/signup')}
          bg="gray.100"
          w="100%"
          color="gray.300"
          h="60px"
          borderRadius="10px"
          _hover={{ bg: 'gray.300', color: 'gray.100' }}
        >
          SignUp
        </Button>
        <Text color="gray.600">
          Create your account to taste many delights and satisfy your hunger!
        </Text>
      </VStack>
    </Grid>
  )
}
