import { Flex, useDisclosure } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../contexts/AuthContext'
import { LoginInfo } from './LoginInfo'
import { LoginForm } from './LoginForm'
import background from '../../assets/reversebackground.jpg'
import { ModalError } from '../../components/Modal/ModalError'

const signInSchema = yup.object().shape({
  email: yup.string().required('Must have an E-mail').email('Invalid e-mail'),
  password: yup.string().required('Must have a password')
})

type SignInData = {
  [key: string]: string
}

export const Login = () => {
  const { signIn } = useAuth()

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm({
    resolver: yupResolver(signInSchema)
  })

  const handleSignIn = ({ email, password }: SignInData) => {
    signIn({ email, password }).catch(err => onModalErrorOpen())
  }

  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose
  } = useDisclosure()

  return (
    <>
      <ModalError
        mess="E-mail or password invalid"
        isOpen={isModalErrorOpen}
        onClose={onModalErrorClose}
      />
      <Flex
        alignItems="center"
        alignContent="center"
        justifyContent="center"
        textAlign="center"
        padding={['10px 15px', '10px 15px', '0', '0']}
        h={['auto', 'auto', '100vh', '100vh']}
        bgImage={background}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      >
        <Flex
          w={['100%', '100%', '90%', '70%']}
          flexDir={['column', 'column', 'row', 'row']}
          alignItems="center"
          justifyContent="center"
        >
          <LoginInfo />
          <LoginForm
            handleSignIn={handleSubmit(handleSignIn)}
            register={register}
            errors={errors}
          />
        </Flex>
      </Flex>
    </>
  )
}
