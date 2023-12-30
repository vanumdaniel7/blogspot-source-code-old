import { Flex, FormControl, FormLabel, Input, Button, Box, Textarea, FormErrorMessage, useToast, Spinner } from "@chakra-ui/react";
import { useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import Maincontent from "../components/Maincontent";

const reducerActions = {
    CHANGE_TITLE: "CHANGE_TITLE",
    CHANGE_CONTENT: "CHANGE_CONTENT",
    CHANGE_TAG1: "CHANGE_TAG1",
    CHANGE_TAG2: "CHANGE_TAG2"
}

const formReducer = (currState, action) => {
    if(action.type === reducerActions.CHANGE_TITLE) {
        return {
            title: action.payload,
            content: currState.content,
            tag1: currState.tag1,
            tag2: currState.tag2
        }
    } else if(action.type === reducerActions.CHANGE_CONTENT) {
        return {
            title: currState.title,
            content: action.payload,
            tag1: currState.tag1,
            tag2: currState.tag2
        }
    } else if(action.type === reducerActions.CHANGE_TAG1) {
        return {
            title: currState.title,
            content: currState.content,
            tag1: action.payload,
            tag2: currState.tag2
        }
    } else if(action.type === reducerActions.CHANGE_TAG2) {
        return {
            title: currState.title,
            content: currState.content,
            tag1: currState.tag1,
            tag2: action.payload
        }
    } else {
        return {
            title: currState.title,
            content: currState.content,
            tag1: currState.tag1,
            tag2: currState.tag2
        }
    }
}

const Addblogpage = () => {
    const initialState = {
        title: "",
        content: "",
        tag1: "",
        tag2: ""
    }
    const toast = useToast();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [currState, dispatch] = useReducer(formReducer, initialState);
    const titleChangeHandler = event => {
        dispatch({ type: reducerActions.CHANGE_TITLE, payload: event.target.value });
    }
    const contentChangeHandler = event => {
        dispatch({ type: reducerActions.CHANGE_CONTENT, payload: event.target.value });
    }
    const tag1ChangeHandler = event => {
        dispatch({ type: reducerActions.CHANGE_TAG1, payload: event.target.value });
    }
    const tag2ChangeHandler = event => {
        dispatch({ type: reducerActions.CHANGE_TAG2, payload: event.target.value });
    }
    const addBlogHandler = async event => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            event.preventDefault();
            const result = await fetch("http://localhost:3000/blogs", {
                method: "POST",
                mode: "cors",
                body: JSON.stringify(currState),
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
            history.push("/home");
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
    const tag1IsValid = currState.tag1.length < 15;
    const tag2IsValid = currState.tag2.length < 15;
    return (
        <>
            <Navbar/>
            <Maincontent>
                <Flex width = "100%" height="calc(100vh - 60px)" justifyContent = "center" alignItems = "center">
                    <Box w="90%" maxW="500px" borderColor="grey.200" shadow="md" borderWidth="2px" borderRadius="lg">
                        <form onSubmit = {addBlogHandler}>
                            <Box width="90%" position="relative" left = "5%">
                                <FormControl isRequired mt={4}>
                                    <FormLabel>Title</FormLabel>
                                    <Input autoComplete = "false" onChange={titleChangeHandler} value = {currState.title} variant="outline" focusBorderColor="teal.400" placeholder="enter title..." type = "text"/>
                                </FormControl>
                                <FormControl isRequired mt={4}>
                                    <FormLabel>Content</FormLabel>
                                    <Textarea autoComplete = "false" height="250px" onChange={contentChangeHandler} value = {currState.content} placeholder='enter content...' focusBorderColor="teal.400" type = "text"/>
                                </FormControl>
                                <Flex width = "100%" justifyContent="space-between">
                                    <FormControl isInvalid = {!tag1IsValid} isRequired mt={4} width = "47%">
                                        <FormLabel>Tag1</FormLabel>
                                        <Input autoComplete = "false" onChange={tag1ChangeHandler} value = {currState.tag1} variant="outline" focusBorderColor={!tag1IsValid ? "red.300" : "teal.400"} placeholder="enter first tag..." type="text"/>
                                        {currState.tag1.length > 15 && <FormErrorMessage>Tag1 should be less than 15 characters long</FormErrorMessage>}
                                    </FormControl>
                                    <FormControl isInvalid = {!tag2IsValid} isRequired mt={4} width = "47%">
                                        <FormLabel>Tag2</FormLabel>
                                        <Input autoComplete = "false" onChange={tag2ChangeHandler} value = {currState.tag2} variant="outline" focusBorderColor={!tag2IsValid ? "red.300" : "teal.400"} placeholder="enter second tag..." type="text"/>
                                        {currState.tag2.length > 15 && <FormErrorMessage>Tag2 should be less than 15 characters long</FormErrorMessage>}
                                    </FormControl>
                                </Flex>
                                <FormControl mt={8} mb={8}>
                                    <Button disabled = {!tag1IsValid || !tag2IsValid} type = "submit" variant="solid" width="100%" colorScheme="teal">{isLoading === true ? <Spinner/> : "Submit"}</Button>
                                </FormControl>
                            </Box>
                        </form>
                    </Box>
                </Flex>
            </Maincontent>
        </>
    )
}

export default Addblogpage;