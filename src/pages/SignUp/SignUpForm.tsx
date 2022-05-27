import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  VStack
} from '@chakra-ui/react'
import { Input } from '../../components/Form/input'
import altria from '../../assets/altria_eat.jpg'
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister
} from 'react-hook-form'
import { useHistory } from 'react-router-dom'

interface SignUpData {
  handleSignUp: () => void
  errors: DeepMap<FieldValues, FieldError>
  register: UseFormRegister<FieldValues>
}

export const SignUpForm = ({ handleSignUp, errors, register }: SignUpData) => {
  const history = useHistory()

  return (
    <Grid
      onSubmit={handleSignUp}
      as="form"
      margin="4"
      w={['100%', '100%', '50%', '50%']}
      padding="30px 25px"
      border="3px solid black"
      bg="white"
      backgroundImage={altria}
      bgRepeat="no-repeat"
      bgPos="center"
      color="gray.600"
      textAlign="left"
    >
      <Flex width="100%" justifyContent="space-between">
        <Heading size="3">SignUp</Heading>
        <Link
          onClick={() => history.push('/')}
          color="gray.300"
          fontWeight="bold"
          background="none"
          _hover={{ color: 'gray.600' }}
        >
          Return to Login
        </Link>
      </Flex>
      <VStack spacing="7" mt="5">
        <Input label="Name" error={errors.name} {...register('name')} />
        <Box w="100%">
          <Input
            label="E-mail"
            error={errors.email}
            type="email"
            {...register('email')}
          />
        </Box>
        <Input
          label="Password"
          type="password"
          error={errors.password}
          {...register('password')}
        />
        <Input
          label="Confirm Password"
          type="password"
          error={errors.confirm_password}
          {...register('confirm_password')}
        />
      </VStack>
      <Button
        mt="10"
        bg="feed.100"
        w="100%"
        color="white"
        h="60px"
        borderRadius="10px"
        _hover={{ bg: '#2a76f1' }}
        type="submit"
      >
        SignUp
      </Button>
    </Grid>
  )
}
