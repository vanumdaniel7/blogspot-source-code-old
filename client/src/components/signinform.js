import { Button, Input, Box, FormControl, FormLabel, useToast, Spinner } from '@chakra-ui/react';
import { useState, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { userActions } from '../store';

const Signinform = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const loginHandler = async event => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const data = {
                email: emailRef.current.value,
                password: passwordRef.current.value
            }
            const result = await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const res = await result.json();
            if(res.token) {
                localStorage.setItem("token", res.token);
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("name", res.data.name);
                localStorage.setItem("email", res.data.email);
                localStorage.setItem("datejoined", res.data.datejoined);
            }
            if(res.status === "success") {
                history.push("/home");
                dispatch(userActions.loginHandler());
            }
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
        <form onSubmit = {loginHandler}>
            <FormControl isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input autoComplete = "false" ref = {emailRef} variant="outline" focusBorderColor="teal.400" placeholder="enter email..." type="email"/>
            </FormControl>
            <FormControl isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input autoComplete = "false" ref = {passwordRef} variant="outline" focusBorderColor="teal.400" placeholder="enter password..." type="password"/>
            </FormControl>
            <FormControl mt={6}>
                <Button variant="solid" width="100%" type="submit" colorScheme="teal">{isLoading === true ? <Spinner/> : "Sign in"}</Button>
            </FormControl>
            <Box width="100%" height="20px"></Box>
        </form>
    )
}

export default Signinform;
