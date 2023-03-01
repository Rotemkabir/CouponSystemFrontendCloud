import { useEffect, useState } from "react";
import { User } from "../../../Models/Auth";
import store from "../../../Redux/Store";
import ClientLink from "../../SharedArea/ClientLink/ClientLink";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<User>(store.getState().userReducer.user);

    useEffect(() => {
        return store.subscribe(() => setUser(store.getState().userReducer.user));
    }, []);

    return (
        <div className="AuthMenu row">
            {(user?.token) ?
            <>Connected as {user.email}<ClientLink to="logout">Logout</ClientLink></> :
            <>Hello guest<ClientLink to="login">Login </ClientLink></>}
        </div>
    );
}

export default AuthMenu;
