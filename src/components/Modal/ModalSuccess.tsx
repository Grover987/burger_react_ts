import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

import mordred from '../../assets/mordred.png'

interface ModalSuccessProps {
  isOpen: boolean
  onClose: () => void
}

export const ModalSuccess = ({ isOpen, onClose }: ModalSuccessProps) => {
  const history = useHistory()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white" bgColor="feed.201" fontWeight="extrabold">
          Are you my Master?
        </ModalHeader>
        <ModalBody>
          <Center flexDir="column">
            <Text fontWeight="extrabold" fontStyle="italic" fontSize="1.3rem">
              Welcome New Master!!!`
            </Text>
            <Text fontStyle="italic" fontSize="m">
              We hope you like our service
            </Text>
            <Image width="200px" src={mordred} />
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={() => history.push('/')} variant="link">
            Return to LogIn Page
          </Button>
          <Button colorScheme="green" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
