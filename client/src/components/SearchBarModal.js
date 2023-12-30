import { InputGroup, InputLeftAddon, Input, useToast, Button } from '@chakra-ui/react';
import { ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Modal,useDisclosure } from '@chakra-ui/react'
import { userResultActions } from '../store/index.js';
import { useState, useEffect } from 'react';
import SearchResults from './SearchResults.js';
import { useDispatch } from 'react-redux';

let isInitital = true;

const SearchBarModal = props => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputName, setInputName] = useState("");
    const dispatch = useDispatch();
    const changeHandler = event => {
        setInputName(prevName => event.target.value);
    }
    useEffect(() => {
        if(isInitital === true) {
            isInitital = false;
            return;
        }
        const checkInput = () => {
            if(inputName.length > 0) {
                dispatch(userResultActions.makeInputNonEmpty());
            } else {
                dispatch(userResultActions.makeInputEmpty());
            }
        }
        const interval = setTimeout(async () => {
            const token = localStorage.getItem("token");
            const result = await fetch(`http://localhost:3000/users/?name=${inputName}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": token
                }
            });
            const res = await result.json();
            if(!result.ok) {
                toast({
                    position: "top",
                    title: res.title,
                    description: res.info,
                    status: res.status,
                    duration: 10000,
                    isClosable: true,
                });
            } else {
                dispatch(userResultActions.replace(res.data));
            }
            checkInput();
            dispatch(userResultActions.notTyping());
        }, 500);
        return () => {
            checkInput();
            dispatch(userResultActions.typing());
            clearInterval(interval);
        }
    }, [inputName, dispatch, toast]);
    return (
      <>
        <Button onClick={onOpen} backgroundColor="transparent" padding={0} mr = {3}><svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></Button>
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay/>
        <ModalContent pb={6} width="90%">
            <ModalHeader>Search for a User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <form>
                    <InputGroup>
                        <InputLeftAddon children="@"></InputLeftAddon>
                        <Input value = {inputName} onChange = {changeHandler} focusBorderColor="teal.400"></Input>
                    </InputGroup>
                </form>
                <SearchResults/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}

export default SearchBarModal;