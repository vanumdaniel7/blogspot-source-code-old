const { Flex, Spinner } = require("@chakra-ui/react")

const Pageloader = () => {
    return (
        <Flex justifyContent="center" alignItems="center" width="100vw" height="100vh" position="fixed">
            <Spinner size="xl" color="teal.400"/>
        </Flex>
    )
}

export default Pageloader;