import { Box } from "@chakra-ui/react"
import { useSelector } from "react-redux";

const Maincontent = props => {
    const mainContentWidth = useSelector(state => state.sidebar.mainContentWidth);
    return (
        <Box position="absolute" top = "60px" right = "0px" width = {[mainContentWidth,mainContentWidth,"100%"]} transition="width 0.3s">
            {props.children}
        </Box>
    )
}

export default Maincontent;