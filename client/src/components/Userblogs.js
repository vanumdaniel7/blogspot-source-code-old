import { Flex } from "@chakra-ui/react";
import Blog from "./Blog";
import { useSelector } from "react-redux";

const Userblogs = () => {
    const blogData = useSelector(state => state.user.blogs);
    return (
        <Flex flexDirection="column" width = "100%" justifyContent = "center" alignItems = "center">
            {
                blogData.map((blog,i) => 
                    <Blog 
                        key={i} 
                        blogtitle={blog.blogtitle} 
                        blogdate={blog.blogdate} 
                        blogcontent={blog.blogcontent} 
                        tag1={blog.tag1}
                        tag2={blog.tag2}
                        userid={blog.userid}
                        username={blog.username}
                    />
                )
            }
        </Flex>
    )
}

export default Userblogs;