import { Grid, GridItem, Text, Center } from '@chakra-ui/react';

const Navbarauthpage = props => {
    return (
        <Grid gap={2} height="60px" width="100%" templateRows="repeat(1,1fr)" templateColumns="repeat(12,1fr)" border="grey.200" borderWidth="1px" shadow="md">
            <GridItem pl={[10,2,0,0]} gridColumnStart={1} gridRowStart={1} colSpan={[3,2,2,1]} rowSpan={1}>
                <Center width="100%" height="100%">
                    <Text color="teal.400" pl={[0,4,2]} fontWeight={["bold","bold","bold"]} fontSize={["2xl","23px","25px"]}>Blogspot</Text>
                </Center>
            </GridItem>
            <GridItem gridColumnEnd={[13,13,13,13]} gridRowStart={1} colSpan={[12,4,3,3]} rowSpan={1}>
                <Center gap={[2,2,2,3]} w={["50px","50px","50px","50px"]} height="100%" float={["right"]}>

                </Center>
            </GridItem>
        </Grid>
    )
}

export default Navbarauthpage;