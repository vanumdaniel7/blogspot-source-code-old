import Navbar from "../components/Navbar.js";
import Blogs from "../components/Blogs.js";
import Maincontent from "../components/Maincontent.js";
import Homepageloader from "../components/Homepageloader.js";
import { useToast } from "@chakra-ui/react";
import { blogsActions } from "../store/index.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

let isInitial = true;

const Homepage = () => {
    const toast = useToast();
    const loadcnt = useSelector(state => state.blogs.loadcnt);
    const dispatch = useDispatch();
    useEffect(() => {
        if(isInitial === true) {
            isInitial = false;
            return;
        }
        const fetchBlogs = async () => {
            dispatch(blogsActions.getSpinner());
            const token = localStorage.getItem("token");
            const result = await fetch(`http://localhost:3000/blogs/load/${loadcnt}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            const res = await result.json();
            if(res.status === "success") {
                dispatch(blogsActions.addBlogs(res));
            } else {
                toast({
                    position: "top",
                    title: res.title,
                    description: res.info,
                    status: res.status,
                    duration: 10000,
                    isClosable: true,
                });
            }
            dispatch(blogsActions.removeSpinner());
        }
        fetchBlogs();
    }, [loadcnt, dispatch, toast]);
    return (
        <>
            <Navbar/>
            <Maincontent>
                <Blogs/>
                <Homepageloader/>
            </Maincontent>
        </>
    )
}

export default Homepage;