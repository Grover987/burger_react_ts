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

import sabercry from '../../assets/sabercry.jpg'

interface ModalErrorProps {
  isOpen: boolean
  onClose: () => void
  mess: string
}

export const ModalError = ({ isOpen, onClose, mess }: ModalErrorProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white" bgColor="feed.404">
          AAAAAHHHHHHHhh!!!!
        </ModalHeader>
        <ModalBody>
          <Center flexDir="column">
            <Text fontWeight="bold" fontSize="lg">
              {mess}
            </Text>
            <Image width="150px" src={sabercry} />
          </Center>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button width="90%" colorScheme="red" onClick={onClose}>
            Try Again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
