import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer bg-secondary">
			<p>Created by Rotem Kabir | Course 822.151 | John Bryce TLV</p>
            <SocialMedia/>
        </div>
    );
}

export default Footer;
