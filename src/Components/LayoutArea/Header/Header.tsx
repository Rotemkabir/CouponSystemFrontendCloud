import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Logo from "../../SharedArea/Logo/Logo";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header bg-secondary">
            <Logo/>
			<h1>Coupons App</h1>
            <AuthMenu/>
        </div>
    );
}

export default Header;
