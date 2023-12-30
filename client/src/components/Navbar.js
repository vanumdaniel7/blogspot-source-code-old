import { Grid, Flex, GridItem, Show, Hide, Text, Center, InputGroup, InputLeftAddon, Input, useToast, Button } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from "react"; 
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userResultActions } from '../store/index.js';
import { sidebarActions } from '../store/index.js';
import SearchBarModal from './SearchBarModal.js';
import SearchResults from "./SearchResults.js";
import Sidebar from "./Sidebar.js";

let isInitital = true;

function Navbar() {
    const history = useHistory();
    const toast = useToast();
    const dispatch = useDispatch();
    const sidebarTranslate = useSelector(state => state.sidebar.translate);
    const inputName = useSelector(state => state.userResult.inputName);
    const changeHandler = event => {
        dispatch(userResultActions.changeInputName(event.target.value));
    }
    const logoutHandler = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("name");
        localStorage.removeItem("datejoined");
        dispatch(userActions.logoutHandler());
        history.push("/");
    }
    const toggleSidebarHandler = () => {
        dispatch(sidebarActions.toggle());
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
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
            if(inputName.length > 1) {
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
                }
                else {
                    dispatch(userResultActions.replace(res.data));
                }
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
            <Grid zIndex={2} backgroundColor="white" gap={2} height="60px" width="100%" templateRows="repeat(1,1fr)" templateColumns="repeat(12,1fr)" border="grey.200" borderWidth="1px" shadow="md" position="fixed" top="0px">
                <GridItem pl={[10,10,0,0]} gridColumnStart={1} gridRowStart={1} colSpan={[3,2,2,1]} rowSpan={1}>
                    <Center width="100%" height="100%">
                        <Text color="teal.400" pl={[0,4,2]} fontWeight={["bold","bold","bold"]} fontSize={["2xl","23px","25px"]}>Blogspot</Text>
                    </Center>
                </GridItem>
                <Show below="md">
                        <Center position="absolute" left="100%" transform="translateX(-100%)" width="120px" height="60px">
                            <Flex justifyContent = "right" alignItems="center" width = "100%" height = "100%">
                                <SearchBarModal/>
                                <Button onClick={toggleSidebarHandler} backgroundColor="transparent" padding={0} mr = {3}><svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg></Button>
                            </Flex>
                        </Center>
                </Show>
                <Hide below='md'>
                    <GridItem position = "relative" gridColumnStart={[2,3,3,4,5]} gridRowStart={1} colSpan={[6,6,4,4,4]} rowSpan={1} maxW={["0px","200px","320px","450px","1000px"]}>
                        <InputGroup position="relative" top="50%" transform="translateY(-50%)">
                            <InputLeftAddon children="@"></InputLeftAddon>
                            <Input autoComplete = "false" value = {inputName} onChange = {changeHandler} focusBorderColor="teal.400"/>
                        </InputGroup>
                        <SearchResults/>
                    </GridItem>
                    <Center position="absolute" left = "100%" top = "30px" transform="translate(-100%,-50%)" gap = {3} pr={3}>
                        <Link to = "/home"><Button backgroundColor = "transparent" fontWeight={400}>Home</Button></Link>
                        <Link to = "/blogs/new"><Button backgroundColor = "transparent" fontWeight={400}>New Blog</Button></Link>
                        <Link to = "/auth/profile"><Button backgroundColor = "transparent" fontWeight={400}>Profile</Button></Link>
                        <Button onClick={logoutHandler} backgroundColor = "transparent" fontWeight={400}>Signout</Button>
                    </Center>
                </Hide>
            </Grid>
            <Show below="md">
                <Sidebar translate = {sidebarTranslate}/>
            </Show>
        </>
    )
}

export default Navbar;