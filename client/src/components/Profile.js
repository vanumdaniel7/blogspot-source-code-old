import { useState, useRef } from 'react';
import { Box, FormControl, FormLabel, Spinner, useToast } from '@chakra-ui/react';
import { Text, Center, Input } from '@chakra-ui/react';
import { Modal, Button, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, FormErrorMessage } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { Route, useParams, Link } from 'react-router-dom';

const Changedetails = () => {
    const toast = useToast();
    const nameRef = useRef();
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [isValidName, setIsValidName] = useState(true);
    const [isValidPassword, setIsValidPassword] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const nameChangeHandler = event => {
        console.log(event.target.value);
        setIsValidName(event.target.value.length === 0 || event.target.value.length > 5);
    }
    const passwordChangeHandler = event => {
        setIsValidPassword(event.target.value.length === 0 || event.target.value.length > 5);
    }
    const isValidForm = isValidName && isValidPassword;
    const changeDetailsHandler = async event => {
        setIsLoading(true);
        event.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const result = await fetch(`http://localhost:3000/auth/?name=${nameRef.current.value}&&password=${passwordRef.current.value}`, {
                mode: "cors",
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            const res = await result.json();
            toast({
                position: "top",
                title: res.title,
                description: res.info,
                status: res.status,
                duration: 10000,
                isClosable: true,
            });
        } catch(err) {
            toast({
                position: "top",
                title: "Error",
                description: "An error occured, please try again later",
                status: "error",
                duration: 10000,
                isClosable: true,
            });
        }
        setIsLoading(false);
    }
    return (
      <>
        <Button variant="outline" onClick={onOpen} leftIcon={<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>}colorScheme='teal'>Edit</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent height="450px" width="95%">
            <ModalHeader>Change Details</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                <Text>Leave the fields you dont want to change</Text>
                <form onSubmit={changeDetailsHandler}>
                    <FormControl mt={4} isInvalid={!isValidName}>
                        <FormLabel>New username</FormLabel>
                        <Input ref={nameRef} onChange={nameChangeHandler} variant="outline" focusBorderColor={!isValidName ? "red.300" : "teal.400"} placeholder="enter username..." type="text"/>
                        {!isValidName && <FormErrorMessage>Name should be atleast 6 characters long</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={4} isInvalid={!isValidPassword}>
                        <FormLabel>New password</FormLabel>
                        <Input ref={passwordRef} onChange={passwordChangeHandler} variant="outline" focusBorderColor={!isValidPassword ? "red.300" : "teal.400"} placeholder="enter password..." type="text"/>
                        {!isValidPassword && <FormErrorMessage>Password should be atleast 6 characters long</FormErrorMessage>}
                    </FormControl>
                    <FormControl mt={6}>
                        <Button disabled={!isValidForm} variant="solid" width="100%" type="submit" colorScheme="teal">{isLoading === true ? <Spinner/> : "Save Changes"}</Button>
                    </FormControl>
                </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

const Profile = () => {
    const details = useSelector(state => state.user.details);
    const { id } = useParams();
    return (
        <Center width="100%">
            <Box borderRadius={5} width="95%" p={4} mt={5} maxW="500px" height="170px" shadow="md" border="grey.200" borderWidth="1px" position="relative">
                <Link to={`/users/${id}`}><Text fontWeight="700" fontSize="xl">{details.name}</Text></Link>
                <Text mt={1} fontSize="md" >{details.email}</Text>
                <Text mt={4} fontWeight="100" fontSize="14px">{details.count} {parseInt(details.count) === 1 ? "blog" : "blogs"}</Text>
                <Text mt={1} fontWeight="100" fontSize="14px">Joined on {details.dateJoined}</Text>
                <Route path = "/auth/profile">
                    <Box position="absolute" right={["20px","10px"]} top={["90px","20px"]}>
                        <Changedetails/>
                    </Box>
                </Route>
            </Box>
        </Center>
    )
}

export default Profile;