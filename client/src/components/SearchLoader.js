import { Flex, Spinner } from "@chakra-ui/react";

const SearchLoader = props => {
    return (
        <Flex justifyContent = "center" alignItems = "center" height = "50px" width = "100%">
            <Spinner/>
        </Flex>
    )
}

export default SearchLoader;