import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  forwardRef
} from '@chakra-ui/react'

import {
  useState,
  useEffect,
  useCallback,
  ForwardRefRenderFunction
} from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldError | null
}

type inputVariationOption = {
  [key: string]: string
}

const inputVariation: inputVariationOption = {
  error: 'feed.404',
  focus: 'feed.100',
  default: 'gray.300',
  filled: 'feed.201'
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = null, label, ...rest },
  ref
) => {
  const [value, setValue] = useState('')
  const [variation, setVariation] = useState('default')

  useEffect(() => {
    if (error) {
      return setVariation('error')
    }
  }, [error])

  const handleInputFocus = useCallback(() => {
    if (!error) {
      setVariation('focus')
    }
  }, [error])

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      setVariation('filled')
    }
  }, [error, value])

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel
          position="absolute"
          zIndex="1000"
          top="-10px"
          left="10px"
          bg="white"
          fontWeight="bold"
        >
          {label}
        </FormLabel>
      )}
      <InputGroup flexDirection="column">
        <ChakraInput
          name={name}
          variant="outline"
          _hover={{ bgColor: 'gray.50' }}
          size="lg"
          h="60px"
          borderRadius="10px"
          borderColor={inputVariation[variation]}
          color={inputVariation[variation]}
          onFocus={handleInputFocus}
          onChangeCapture={e => setValue(e.currentTarget.value)}
          onBlurCapture={handleInputBlur}
          ref={ref}
          {...rest}
        />
        {!!error && (
          <FormErrorMessage
            fontStyle="italic"
            fontWeight="extrabold"
            bgColor="gray.100"
            width="fit-content"
          >
            {error.message}
          </FormErrorMessage>
        )}
      </InputGroup>
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
