import Maincontent from "../components/Maincontent";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import Userpageloader from "../components/Userpageloader";
import Userblogs from "../components/Userblogs";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { userActions } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import Pageloader from "../components/Pageloader";

let isInitial = true;

const Userpage = () => {
    const loadcnt = useSelector(state => state.user.loadcnt);
    const toast = useToast();
    const history = useHistory();
    let { id } = useParams();
    if(id === undefined) {
        id = localStorage.getItem("id");
    }
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchUserDetails = async () => {
            setIsLoading(true);
            const Id = parseInt(id);
            if(isNaN(Id)) {
                history.push("/home");
                return;
            }
            const result = await fetch(`http://localhost:3000/users/${parseInt(id)}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            const res = await result.json();
            if(res.status === "success") {
                dispatch(userActions.getDetails(res.details));
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
            setIsLoading(false);
        }
        fetchUserDetails();
    }, [dispatch, history, id, toast, token]);
    useEffect(() => {
        const fetchUserBlogs = async () => {
            if(isInitial === true) {
                isInitial = false;
                return;
            }
            const Id = parseInt(id);
            if(isNaN(Id)) {
                history.push("/home");
                return;
            }
            dispatch(userActions.getSpinner());
            const result = await fetch(`http://localhost:3000/users/${parseInt(id)}/blogs/${loadcnt}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });
            const res = await result.json();
            if(res.status === "success") {
                dispatch(userActions.getBlogs(res.data));
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
            dispatch(userActions.removeSpinner());
        }
        fetchUserBlogs();
    }, [id, dispatch, toast, history, loadcnt, token]);
    return (
        <>
            <Navbar/>
            {isLoading && <Pageloader/>}
            <Maincontent>
                {!isLoading && <Profile/>}
                {!isLoading && <Userblogs/>}
                {!isLoading && <Userpageloader/>}
            </Maincontent>
        </>
    )
}

export default Userpage;