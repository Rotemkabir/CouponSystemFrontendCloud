import "./SocialMedia.css";
import { TiSocialFacebook, TiSocialLinkedin, TiSocialYoutube } from "react-icons/ti";

function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
            <a href="https://www.linkedin.com/in/rotem-bussi-071ba5249/"><TiSocialLinkedin size={28}/></a>
            <a href="https://www.youtube.com/watch?v=Nqgr-6Lte1E"><TiSocialYoutube size={28}/></a>
            <a href="https://www.facebook.com/profile.php?id=100028315684952"><TiSocialFacebook size={28}/></a>  
        </div>
    );
}

export default SocialMedia;
