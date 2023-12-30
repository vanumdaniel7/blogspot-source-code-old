import { Flex, Text } from "@chakra-ui/react";

const NoResult = props => {
    return (
        <Flex justifyContent = "center" alignItems = "center" height = "50px" width = "100%">
            <Text>No Results found</Text>
        </Flex>
    )
}

export default NoResult;