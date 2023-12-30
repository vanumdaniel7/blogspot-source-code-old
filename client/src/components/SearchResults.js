import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import SearchLoader from "./SearchLoader";
import NoResult from "./NoResult.js";
import SearchResultElement from "./SearchResultElement";

const SearchResults = props => {
    const isInputEmpty = useSelector(state => state.userResult.isInputEmpty);
    const results = useSelector(state => state.userResult.users);
    const isTyping = useSelector(state => state.userResult.isTyping);
    return (
        <Box background = "white" width = "calc(100% - 40px - 49px)" position = {["relative","relative","absolute"]} top = {["0px","0px","50px"]} left = {["49px", "49px", "49px"]} boxShadow = "md">
            {!isTyping && results.map(result => <SearchResultElement key = {result.id} id = {result.id} name = {result.name} email = {result.email}/>)}
            {isTyping && !isInputEmpty && <SearchLoader/>}
            {results.length === 0 && !isTyping && !isInputEmpty &&<NoResult/>}
        </Box>
    )
}

export default SearchResults;