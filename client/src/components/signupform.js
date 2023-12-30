import { Box, FormControl, FormLabel, Input, Button, Spinner } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useRef, useState } from 'react';

const Signupform = () => {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const signupHandler = async event => {
        setIsLoading(true);
        try{
            event.preventDefault();
            const data = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            };
            const result = await fetch("http://localhost:3000/auth", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
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
        <Box>
            <form onSubmit = {signupHandler}>
                <FormControl isRequired mt={4}>
                    <FormLabel>Name</FormLabel>
                    <Input autoComplete = "false" ref = {nameRef} variant="outline" focusBorderColor="teal.400"  name="name" placeholder="enter name..." type="name"/>
                </FormControl>
                <FormControl isRequired mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input autoComplete = "false" ref = {emailRef} variant="outline" focusBorderColor="teal.400"  name="email" placeholder="enter email..." type="email"/>
                </FormControl>
                <FormControl isRequired mt={4}>
                    <FormLabel>Password</FormLabel>
                    <Input autoComplete = "false" ref = {passwordRef} variant="outline" focusBorderColor="teal.400"  name="password" placeholder="enter password..." type="password"/>
                </FormControl>
                <FormControl mt={8}>
                    <Button type = "submit" variant="solid" width="100%" colorScheme="teal">{isLoading === true ? <Spinner/> : "Sign up"}</Button>
                </FormControl>
            </form>
        </Box>
    )
}

export default Signupform;