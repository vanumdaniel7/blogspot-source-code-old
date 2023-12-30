import { Grid, GridItem, Text, Box, Badge, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Blog = props => {
    return (
            <Grid mt={5} backgroundColor="white" templateRows="repeat(20,1fr)" templateColumns="repeat(12,1fr)" width="95%" maxW="500px" height="calc(700px - 60px - 40px)" shadow="md" border="grey.200" borderWidth="1px" borderRadius={5}>
                <GridItem rowStart={1} colStart={1} rowSpan={6} colSpan={12}>
                    <Flex flexDirection="column" justifyContent="left" width = "100%" height = "100%">
                        <Link to = {`/users/${props.userid}`}><Text fontSize = "20px" position="relative" left = "25px" top = "15px" fontWeight={400} width="85%" display="inline">{props.username}</Text></Link>
                        <Text fontWeight="100" position="relative" left = "25px" top = "25px" fontSize="12px" width="85%">{props.blogdate}</Text>
                        <Text width = "90%" position="relative" left = "25px" top = "35px" noOfLines={2} fontWeight={400} fontSize = "17px" mb = {5}>{props.blogtitle}</Text>
                        <Box position="relative" left = "25px" top = "25px" width="90%">
                            <Badge variant="solid" colorScheme="green" mr={2}>{props.tag1}</Badge>
                            <Badge variant="solid" colorScheme="green" mr={2}>{props.tag2}</Badge>
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem rowStart={6} colStart={1} rowSpan={19} colSpan={12} border="gray.200" p={3} position="relative" top="-10px">
                    <Box border="gray.200" borderWidth="1px" p={3} position = "relative" top = "30px" height="400px" overflow="hidden">
                        <Text noOfLines={15} textAlign="justify">
                            {props.blogcontent}
                        </Text>
                    </Box>
                </GridItem>
            </Grid>
    )
}

export default Blog;