import { Input, FormControl, FormLabel, Button, Spinner, useToast } from '@chakra-ui/react';
import { useState, useRef } from 'react';

const ForgotPassword = () => {
    const toast = useToast();
    const emailRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const submitHandler = async event => {
        event.preventDefault();
        setIsLoading(true);
        const enteredEmail = emailRef.current.value;
        const result = await fetch(`http://localhost:3000/auth/resetemail?email=${enteredEmail}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
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
        setIsLoading(false);
    }
    return (
        <form onSubmit={submitHandler}>
            <FormControl isRequired mt={4}>
                <FormLabel>Email</FormLabel>
                <Input ref={emailRef} variant="outline" focusBorderColor="teal.400" name="username" placeholder="enter email..." type="email"/>
            </FormControl>
            <FormControl mt={6}>
                <Button variant="solid" width="100%" type="submit" colorScheme="teal">{isLoading === true ? <Spinner/> : "Send mail"}</Button>
            </FormControl>
        </form>
    )
}

export default ForgotPassword;