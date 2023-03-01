import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./ClientLink.css";

interface ClientLinkProps{
    to:string;
    children:any;
}

function ClientLink(props:ClientLinkProps): JSX.Element {
    let resolved = useResolvedPath(props.to);
    let match = useMatch({ path: resolved.pathname, end: true });
    return (
        <div className="ClientLink">
		<Link className={match?"ClientLink active":"ClientLink"} to={props.to}>{props.children}</Link>
        </div>
    );
}

export default ClientLink;
