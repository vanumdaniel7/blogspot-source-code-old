import { Flex, Spinner } from "@chakra-ui/react"
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { blogsActions } from "../store";
import { useSelector,useDispatch } from "react-redux";
let isInitial = true

const Homepageloader = props => {
    const isLoading = useSelector(state => state.blogs.isLoading);
    const dispatch = useDispatch();
    const { ref, inView } = useInView({
        threshold: 1
    });
    useEffect(() => {
        if(inView === false || isInitial === true) {
            isInitial = false;
            return;
        }
        dispatch(blogsActions.increaseLoadCnt());
    }, [inView, dispatch])
    return (
        <Flex ref={ref} justifyContent = "center" alignItems = "center" height="80px">
            {isLoading && <Spinner/>}
        </Flex>
    )
}

export default Homepageloader;