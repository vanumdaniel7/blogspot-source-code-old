import Authpage from "./pages/Authpage.js";
import Homepage from "./pages/Homepage.js";
import Forgotpasswordpage from "./pages/Forgotpasswordpage.js";
import Addblogpage from "./pages/Addblogpage.js";
import Verifyaccountpage from "./pages/Verifyaccountpage.js";
import Userpage from "./pages/Userpage.js";
import Notfoundpage from "./pages/Notfoundpage.js";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    return (
        <Switch>
            <Route path = "/" exact><Authpage/></Route>
            <Route path = "/auth/reset/:token" exact><Forgotpasswordpage/></Route>
            <Route path = "/auth/verify/:token" exact><Verifyaccountpage/></Route>
            {isLoggedIn && <Route path = "/auth/profile" exact><Userpage/></Route>}
            {isLoggedIn && <Route path = "/home" exact><Homepage/></Route>}
            {isLoggedIn && <Route path = "/blogs/new" exact><Addblogpage/></Route>}
            {isLoggedIn && <Route path = "/users/:id" exact><Userpage/></Route>}
            {isLoggedIn && <Route path = "*" exact><Notfoundpage/></Route>}
            {!isLoggedIn && <Route path = "*"><Redirect to = "/"/></Route>}
        </Switch>
    )
}

export default App;