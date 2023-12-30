import { Box, Text, Tabs, Tab, TabList, TabPanels, TabPanel, Flex } from '@chakra-ui/react'
import ForgotPassword from '../components/ForgotPassword.js';
import Navbarauthpage from "../components/Navbarauthpage.js";
import Signinform from '../components/signinform.js';
import Signupform from '../components/signupform.js';

const Authpage = () => {
    return (
        <>
            <Navbarauthpage/>
            <Flex justifyContent="center" alignItems="center" width="100%" height="150px">    
                <Box width="350px">
                    <Text textAlign="center" fontWeight={["bold","bold","bold"]} fontSize={["40px","40px","40px"]} color="#39424e" position="relative" top="-20px">Heading</Text>
                    <Text textAlign="center">bla blefwegre blaweglieargb lawerbgfay learghbl</Text>
                </Box>
            </Flex>
            <Flex justifyContent="center" width="100%" height="470px">
                <Box w="95%" maxW="400px" height="450px" borderColor="grey.200" shadow="md" borderWidth="2px" borderRadius="lg">
                <Tabs colorScheme="teal">
                    <TabList pt={2} pl={2}>
                        <Tab>Sign in</Tab>
                        <Tab>Sign up</Tab>
                        <Tab>ForgotPassword</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Signinform/>
                        </TabPanel>
                        <TabPanel>
                            <Signupform/>
                        </TabPanel>
                        <TabPanel>
                            <ForgotPassword/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                </Box>
            </Flex>
        </>
    )
}

export default Authpage;