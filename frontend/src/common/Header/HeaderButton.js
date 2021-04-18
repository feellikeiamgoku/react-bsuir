import './Header.css'
import { Link } from 'react-router-dom'

function HeaderButton({linkName, link}) {
    return (
        <div className="HeaderButton">
            <Link className="header-link" to={link}>{linkName}</Link>
        </div>
    );
}

export default HeaderButton;
