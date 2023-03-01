import { useEffect } from "react";
import "./Logout.css";
import store from "../../../Redux/Store";
import { loggedOut } from "../../../Redux/UserAppState";
import { useNavigate } from "react-router-dom";

function Logout(): JSX.Element {
    const navigate = useNavigate();
    useEffect(() => {
        store.dispatch(loggedOut());
        navigate('/login');
    }, []);
    return (
        <></>
    );
}

export default Logout;

