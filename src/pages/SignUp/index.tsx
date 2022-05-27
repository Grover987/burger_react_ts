import { Flex, useDisclosure } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignUpInfo } from './SignUpInfo'
import { SignUpForm } from './SignUpForm'
import background from '../../assets/background.jpg'
import { api } from '../../services/api'
import { ModalSuccess } from '../../components/Modal/ModalSuccess'
import { ModalError } from '../../components/Modal/ModalError'

const signUpSchema = yup.object().shape({
  name: yup.string().required('Must have a name'),
  email: yup.string().required('Must have a E-mail').email('Invalid e-mail'),
  password: yup.string().required('Must have a password'),
  confirm_password: yup
    .string()
    .required('Must have to confirm')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

type SignUpData = {
  [key: string]: string
}

export const SignUp = () => {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm({
    resolver: yupResolver(signUpSchema)
  })

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose
  } = useDisclosure()
  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose
  } = useDisclosure()

  const handleSignUp = ({ name, email, password }: SignUpData) => {
    api
      .post('/register', { name, email, password })
      .then(res => onModalSuccessOpen())
      .catch(err => onModalErrorOpen())
  }

  return (
    <>
      <ModalSuccess isOpen={isModalSuccessOpen} onClose={onModalSuccessClose} />

      <ModalError
        mess="Your e-mail already exist!!!"
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
        bgSize="cover"
        bgPos="center"
      >
        <Flex
          w={['100%', '100%', '90%', '70%']}
          flexDir={['column-reverse', 'column-reverse', 'row', 'row']}
          alignItems="center"
          justifyContent="center"
        >
          <SignUpForm
            handleSignUp={handleSubmit(handleSignUp)}
            register={register}
            errors={errors}
          />
          <SignUpInfo />
        </Flex>
      </Flex>
    </>
  )
}
