import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const SearchResultElement = props => {
    return (
        <Link to = {`/users/${props.id}`}>
            <Box background = "white" height = "55px" border = "1px" borderColor = "gray.200" mt = "2px" borderRadius={["5px", "5px", "0px"]}>
                <Text ml = {2} mt = {1} fontSize = "16px" fontWeight={400}>{props.name}</Text>
                <Text ml = {2} mt = {1} fontSize = "12px">{props.email}</Text>
            </Box>
        </Link>
    )
}

export default SearchResultElement;